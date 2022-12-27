import bcrypt from "bcrypt";
import { saltRounds } from "./constants";

export function passwordHash(password: string) {
  return bcrypt.hashSync(password, saltRounds);
}
