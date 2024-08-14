import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      async profile(profile: GithubProfile) {
        const credentialsValue = {
          o_id: profile.id,
          name: profile.login,
          username: profile.login,
          signin_type: "oauth",
          provider: "github",
          profile_url: profile.avatar_url,
        };
        const res = await fetch(process.env.SERVER_URL + "/user/signin_oauth", {
          method: "POST",
          body: JSON.stringify(credentialsValue),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        const newUser: User = {
          id: user.result.user.o_id,
          name: user.result.user.name,
          username: user.result.user.username,
          role: user.result.user.role ?? "user",
          accessToken: user.result.accessToken,
          refreshToken: user.result.refreshToken,
        };
        return {
          ...profile,
          id: profile.id.toString(),
          username: profile.login,
          role: profile.role ?? "user",
          image: profile.avatar_url,
          accessToken: user.result.accessToken,
          refreshToken: user.result.refreshToken,
          details: newUser,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const credentialsValue = { username: credentials?.username, password: credentials?.password };
        const res = await fetch(process.env.SERVER_URL + "/user/signin", {
          method: "POST",
          body: JSON.stringify(credentialsValue),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        if (res.ok && user) {
          const newUser: User = {
            id: user.result.user.id,
            name: user.result.user.name,
            username: user.result.user.username,
            role: user.result.user.role ?? "user",
            accessToken: user.result.accessToken,
            refreshToken: user.result.refreshToken,
          };
          return newUser;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }

      if (user) {
        token.role = user.role;
        token.username = user.username;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) {
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
};
