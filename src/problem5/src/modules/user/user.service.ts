import { In } from "typeorm";

import { AppDataSource } from "../../config/data-source";
import { User } from "../../entities/user.entity";
import { hashPwd } from "../../utils/encrypt";

const userRepository = AppDataSource.getRepository(User);

/**
 * Get multiple users by their IDs
 * @param ids - Array of user IDs
 * @returns A list of users with their ID and username
 */
export async function getUsersByIds(
  ids?: string[],
  sort: "ASC" | "DESC" = "ASC",
  limit: number = 10,
  offset: number = 0
): Promise<User[]> {
  const usersQuery = AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .orderBy("user.username", sort)
    .offset(offset)
    .limit(limit);

  if (ids) {
    usersQuery.andWhere({ id: In(ids) });
  }

  return await usersQuery.getMany();
}

/**
 * Get a user by ID
 * @param id - The user's unique ID
 * @returns The user or null if not found
 */
export async function getUserById(id: string): Promise<User | null> {
  return await userRepository.findOneBy({ id });
}

/**
 * Get a user by username
 * @param username - The user's username
 * @returns The user or null if not found
 */
export async function getUserByUsername(
  username: string
): Promise<User | null> {
  return await userRepository.findOneBy({ username });
}

/**
 * Update a user's information
 * @param id - The user's unique ID
 * @param updates - An object containing the fields to update
 * @returns The updated user
 */
export async function updateUser(
  id: string,
  updates: Partial<User>
): Promise<User | null> {
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    throw new Error("User not found.");
  }

  if (updates.username) {
    user.username = updates.username;
  }
  if (updates.password) {
    user.password = await hashPwd(updates.password);
  }

  return await userRepository.save(user);
}

export async function deleteUser(id: string): Promise<boolean> {
  await userRepository.delete({ id });
  return true;
}
