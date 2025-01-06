import * as bcrypt from "bcrypt";

export async function hashPwd(pwd: string): Promise<string> {
  const saltRounds = 10;
  const hashedPwd = await bcrypt.hash(pwd, saltRounds);
  return hashedPwd;
}

export async function comparePwd(
  plainPwd: string,
  hashedPwd: string
): Promise<boolean> {
  return await bcrypt.compare(plainPwd, hashedPwd);
}
