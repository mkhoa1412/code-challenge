import { Request, Response } from "express"
import { AuthenticatedRequest } from "../types"
import scoreService from "../services/scoreService"

class LeaderboardController {
  async getLeaderboard(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10
      const leaderboard = await scoreService.getLeaderboard(limit)

      let userRank = null
      const authenticatedReq = req as AuthenticatedRequest
      if (authenticatedReq.user) {
        try {
          userRank = await scoreService.getUserRank(authenticatedReq.user.id)
        } catch (error) {
          console.error("Error getting user rank:", error)
        }
      }

      res.status(200).json({
        success: true,
        leaderboard,
        user_rank: userRank,
        updated_at: new Date().toISOString(),
      })
    } catch (error: any) {
      console.error("Get leaderboard with user rank controller error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve leaderboard",
      })
    }
  }
}

export default new LeaderboardController()
