import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware(req: any) {
    const isAdmin = req.nextauth.token?.user?.roles[0] === "ADMIN";
    if (req.nextUrl.pathname.startsWith("/dashboard") && !isAdmin) {
      return NextResponse.rewrite(new URL("/"));
    }
  },

  {
    callbacks: { authorized: ({ req, token }) => !!token },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
