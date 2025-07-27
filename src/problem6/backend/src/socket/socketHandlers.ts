import { Server, Socket } from "socket.io"
import {
  SocketUser,
  SocketAuthData,
  LeaderboardUpdateData,
  ScoreUpdateData,
  UserRankUpdateData,
} from "../types"
import { verifyToken } from "../middleware/auth"
import prisma from "../utils/prisma"
import scoreService from "../services/scoreService"

class SocketHandlers {
  private io: Server

  constructor(io: Server) {
    this.io = io
    this.setupHandlers()
  }

  private setupHandlers(): void {
    this.io.on("connection", async (socket: Socket) => {
      console.log("Client connected:", socket.id)

      // Automatically join leaderboard room for all connections
      socket.join("leaderboard")
      console.log(`Client ${socket.id} automatically joined leaderboard room`)

      // Try to authenticate user from socket auth data
      let user = null
      const token = socket.handshake.auth?.token
      if (token) {
        try {
          const decoded = verifyToken(token)
          if (decoded) {
            user = await prisma.user.findUnique({
              where: { id: decoded.userId },
              select: {
                id: true,
                email: true,
                username: true,
                score: true,
                createdAt: true,
                updatedAt: true,
              },
            })
            if (user) {
              // Join user-specific room for personal updates
              socket.join(`user_${user.id}`)
              ;(socket as SocketUser).userId = user.id
              console.log(
                `User ${user.username} (${user.id}) authenticated and joined personal room`,
              )
            }
          }
        } catch (error) {
          console.error("Socket authentication error:", error)
        }
      }

      // Send initial leaderboard data to the newly connected client
      try {
        const leaderboard = await scoreService.getLeaderboard()
        const leaderboardData: LeaderboardUpdateData = {
          leaderboard,
          updated_at: new Date().toISOString(),
        }
        socket.emit("leaderboard_update", leaderboardData)
      } catch (error) {
        console.error("Error sending initial leaderboard:", error)
      }

      // Handle joining leaderboard room (legacy support)
      socket.on("join_leaderboard", async (data: SocketAuthData) => {
        try {
          let user = null

          // Verify JWT token if provided
          if (data && data.token) {
            const decoded = verifyToken(data.token)
            if (decoded) {
              user = await prisma.user.findUnique({
                where: { id: decoded.userId },
                select: {
                  id: true,
                  email: true,
                  username: true,
                  score: true,
                  createdAt: true,
                  updatedAt: true,
                },
              })
              if (user) {
                // Join user-specific room for personal updates
                socket.join(`user_${user.id}`)
                ;(socket as SocketUser).userId = user.id
                console.log(`User ${user.username} joined personal room`)
              }
            }
          }

          // Join leaderboard room
          socket.join("leaderboard")
          console.log(`Client ${socket.id} joined leaderboard room`)

          // Send current leaderboard state
          const leaderboard = await scoreService.getLeaderboard()
          const leaderboardData: LeaderboardUpdateData = {
            leaderboard,
            updated_at: new Date().toISOString(),
          }
          socket.emit("leaderboard_update", leaderboardData)
        } catch (error) {
          console.error("Error joining leaderboard:", error)
          socket.emit("error", {
            message: "Failed to join leaderboard",
          })
        }
      })

      // Handle leaving leaderboard room
      socket.on("leave_leaderboard", () => {
        socket.leave("leaderboard")
        const socketUser = socket as SocketUser
        if (socketUser.userId) {
          socket.leave(`user_${socketUser.userId}`)
        }
        console.log(`Client ${socket.id} left leaderboard room`)
      })

      // Handle requesting current leaderboard
      socket.on("get_leaderboard", async () => {
        try {
          const leaderboard = await scoreService.getLeaderboard()
          const leaderboardData: LeaderboardUpdateData = {
            leaderboard,
            updated_at: new Date().toISOString(),
          }
          socket.emit("leaderboard_update", leaderboardData)
        } catch (error) {
          console.error("Error getting leaderboard for socket:", error)
          socket.emit("error", {
            message: "Failed to get leaderboard",
          })
        }
      })

      // Handle ping/pong for connection health
      socket.on("ping", () => {
        socket.emit("pong", {
          timestamp: new Date().toISOString(),
        })
      })

      // Handle disconnection
      socket.on("disconnect", (reason: string) => {
        console.log(`Client ${socket.id} disconnected:`, reason)
        const socketUser = socket as SocketUser
        if (socketUser.userId) {
          console.log(`User ${socketUser.userId} disconnected`)
        }
      })

      // Handle connection errors
      socket.on("error", (error: Error) => {
        console.error("Socket error:", error)
      })
    })
  }

  broadcastLeaderboardUpdate(leaderboard: any[]): void {
    const leaderboardData: LeaderboardUpdateData = {
      leaderboard,
      updated_at: new Date().toISOString(),
    }
    this.io.to("leaderboard").emit("leaderboard_update", leaderboardData)
  }

  sendScoreUpdate(userId: number, scoreData: Partial<ScoreUpdateData>): void {
    const updateData: ScoreUpdateData = {
      ...scoreData,
      updated_at: new Date().toISOString(),
    } as ScoreUpdateData
    this.io.to(`user_${userId}`).emit("score_update", updateData)
  }
}

export default SocketHandlers
