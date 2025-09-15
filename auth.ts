
import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) return null;
          const { email, password } = credentials;

          const res = await axios.post(
            "http://localhost:8000/api/v1/auth/signin",
            {
              userEmail: email,
              userPassword: password,
            }
          );
      
          const { user, token } = res.data;
         

          if (!user) return null;
         

          return {
            id: user.id,
            email: user.userEmail || user.email,
            name: user.userName || user.name,
            accessToken: token,
          };
        } catch (error: any) {
          console.error(
            "Authorize error:",
            error.response?.data || error.message || error
          );
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.name = user.name;
        token.email = user.email; 
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string; 
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handlers as GET, handlers as POST };
