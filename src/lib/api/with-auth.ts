import { getServerSession, Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export interface AuthenticatedContext<T = unknown> {
  session: Session;
  params: T;
}

type AuthenticatedApiHandler<T = unknown> = (
  req: NextRequest,
  context: AuthenticatedContext<T>
) => Promise<NextResponse>;

interface RouteContext<T = unknown> {
  params: T | Promise<T>;
}

/**
 * A higher-order function that wraps an API route handler to ensure authentication and resolve route parameters.
 * 
 * @param handler The handler function that will be executed with authentication.
 * @returns A new API route handler with authentication and parameter resolution.
 */
export function withAuth<T = unknown>(handler: AuthenticatedApiHandler<T>) {
  return async (req: NextRequest, context: RouteContext<T>): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await context.params;

    return handler(req, { session, params: resolvedParams });
  };
}
