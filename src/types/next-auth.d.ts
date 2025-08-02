import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
      username?: string;
    } & DefaultSession['user'];
  }

  interface User {
    username?: string;
    termsAccepted: boolean;
    privacyPolicyAccepted: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    id?: string;
    username?: string;
    termsAccepted: boolean;
    privacyPolicyAccepted: boolean;
  }
}
