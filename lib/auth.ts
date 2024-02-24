import { authOptions } from "@App/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth/next";

export async function useCurresntUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}