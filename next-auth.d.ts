// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: string;
      image: string;
      token: string;
      accessToken: string;
      refreshToken: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    username: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}
