import NextAuth, { type NextAuthOptions } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    CredentialsProvider({
      id: "email",
      name: "email",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "bruce@wayne.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        if (!user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (passwordsMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
