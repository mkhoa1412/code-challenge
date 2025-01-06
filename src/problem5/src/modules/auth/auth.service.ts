import { AppDataSource } from "../../config/data-source";
import { User } from "../../entities";
import { comparePwd, hashPwd } from "../../utils/encrypt";
import { generateToken } from "../../utils/jwt";

const userRepository = AppDataSource.getRepository(User);

/**
 * Create a new user
 * @param username - User's unique username
 * @param password - User's plain-text password
 * @returns The created user
 */
export async function createUser(
  username: string,
  password: string
): Promise<User> {
  const existingUser = await userRepository.findOneBy({ username });
  if (existingUser) {
    throw new Error("User already exists.");
  }

  const hashedPassword = await hashPwd(password);
  const newUser = userRepository.create({ username, password: hashedPassword });
  await userRepository.save(newUser);
  const user = await userRepository.findOneBy({ username });
  return user;
}

export async function login(
  username: string,
  password: string
): Promise<string> {
  const user = await userRepository.findOne({
    where: { username },
    select: ["id", "username", "password"],
  });
  if (!user) {
    throw new Error("User not found.");
  }

  const isValid = await comparePwd(password, user.password);
  if (!isValid) {
    throw new Error("Invalid password.");
  }

  const token = generateToken({ id: user.id, username: user.username });

  return token;
}
