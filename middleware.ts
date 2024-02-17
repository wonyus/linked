// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { apiAuthPrefix, authRoutes, publicRoutes } from "./routes";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname)
    // console.log(request.nextauth.token)
    const { nextUrl } = request;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (request.nextUrl.pathname.startsWith("/extra") && request.nextauth.token?.role !== "admin") {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/client") && request.nextauth.token?.role !== "admin" && request.nextauth.token?.role !== "manager") {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    return null
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"] };
