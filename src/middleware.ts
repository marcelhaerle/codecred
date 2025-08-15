import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { SUBSCRIPTION_PLAN } from "./lib/types";

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
  const plan: SUBSCRIPTION_PLAN = request.nextauth?.token?.plan as SUBSCRIPTION_PLAN || SUBSCRIPTION_PLAN.NONE;
  const isUpgradePage = request.nextUrl.pathname.startsWith("/auth/upgrade");

  if (plan === SUBSCRIPTION_PLAN.NONE && !isUpgradePage && !isAgreementPage) {
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
