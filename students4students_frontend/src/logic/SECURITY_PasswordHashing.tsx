import { SHA256 } from "crypto-js";

export function hashPassword(password: string): string {
  const hash = SHA256(password);
  return hash.toString();
}
