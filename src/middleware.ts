import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { getSubscriptionStatus } from "./lib/subscription";
import { NextResponse } from "next/server";

export default withAuth(async function (request: NextRequestWithAuth) {
  const termsAccepted = request.nextauth?.token?.termsAccepted;
  const privacyPolicyAccepted = request.nextauth?.token?.privacyPolicyAccepted;
  const isAgreementPage = request.nextUrl.pathname.startsWith("/auth/agreement");

  if ((!termsAccepted || !privacyPolicyAccepted) && !isAgreementPage) {
    // Redirect to terms and privacy policy acceptance page if not accepted
    return NextResponse.redirect(new URL("/auth/agreement", request.url));
  }

  // Check if user has an active subscription
  // If not, redirect to upgrade page
  const userId = request.nextauth?.token?.id || null;
  const subscription = await getSubscriptionStatus(userId);
  const isUpgradePage = request.nextUrl.pathname.startsWith("/auth/upgrade");

  if (subscription.plan === "NONE" && !isUpgradePage && !isAgreementPage) {
    return NextResponse.redirect(new URL("/auth/upgrade", request.url));
  }
}, {
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: ["/auth/:path*"],
};
