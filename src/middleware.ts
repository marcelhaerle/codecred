import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { getSubscriptionStatus } from "./lib/subscription";
import { NextResponse } from "next/server";

const isSaas = process.env.NEXT_PUBLIC_IS_SAAS_VERSION === "true";

export default withAuth(async function (request: NextRequestWithAuth) {
  if (isSaas) {
    // Check if user has an active subscription
    // If not, redirect to upgrade page
    const userId = request.nextauth?.token?.id || null;
    const subscription = await getSubscriptionStatus(userId);

    if (subscription.plan === "NONE" && !request.nextUrl.pathname.startsWith("/auth/upgrade")) {
      return NextResponse.redirect(new URL("/auth/upgrade", request.url));
    }
  }
}, {
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: ["/auth/:path*"],
};
