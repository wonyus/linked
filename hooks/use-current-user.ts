import { User } from "next-auth";
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session } = useSession();
  return session?.user as User;
};