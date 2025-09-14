import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User extends DefaultUser {
    id: string; 
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
    name?: string;
    email?: string;
  }
}
