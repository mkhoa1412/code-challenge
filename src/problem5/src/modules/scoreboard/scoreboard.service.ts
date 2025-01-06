import { In } from "typeorm";

import { AppDataSource } from "../../config/data-source";
import { Scoreboard } from "../../entities/scoreboard.entity";

export async function joinScoreboard(userId: string): Promise<Scoreboard> {
  const scoreboardRepo = AppDataSource.getRepository(Scoreboard);
  const existingEntry = await scoreboardRepo.findOneBy({ userId });

  if (existingEntry) {
    throw new Error("User already joined the scoreboard.");
  }

  const newEntry = scoreboardRepo.create({ userId, score: 0 });
  return await scoreboardRepo.save(newEntry);
}

export async function getScoreboard(
  sort: "asc" | "desc" = "desc",
  limit: number = 10,
  offset: number = 0,
  userIds?: string[]
): Promise<Scoreboard[]> {
  const scoreboardRepo = AppDataSource.getRepository(Scoreboard);
  return await scoreboardRepo.find({
    order: { score: sort === "asc" ? "ASC" : "DESC" },
    take: limit,
    skip: offset,
    where: userIds ? { userId: In(userIds) } : undefined,
  });
}

export async function updateScore(userId: string): Promise<Scoreboard> {
  const scoreboardRepo = AppDataSource.getRepository(Scoreboard);
  const entry = await scoreboardRepo.findOne({ where: { userId } });

  if (!entry) {
    throw new Error("Scoreboard entry not found or unauthorized.");
  }

  entry.score += 1;
  return await scoreboardRepo.save(entry);
}

export async function leaveScoreboard(userId: string): Promise<boolean> {
  const scoreboardRepo = AppDataSource.getRepository(Scoreboard);
  const result = await scoreboardRepo.delete({ userId });

  if (result.affected === 0) {
    throw new Error("Scoreboard entry not found or unauthorized.");
  }

  return true;
}
