import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@server/db/client";
import { env } from "@env/server.mjs";
import { Approval, User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },

    async signIn({ user }) {
      const prismaUser = user as User;
      if (prismaUser.approved != Approval.APPROVED) {
        return "/pending";
      } else {
        return true;
      }
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          // prompt: "",
          access_type: "offline",
          response_type: "code",
          scope: "https://www.googleapis.com/auth/calendar openid",
        },
      },
    }),
  ],
};

export default NextAuth(authOptions);
