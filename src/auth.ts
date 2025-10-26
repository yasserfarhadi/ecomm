import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import { prisma } from "./db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { AdapterUser } from "next-auth/adapters";
export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          if (isMatch)
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
        }
        // if the user does not exist or the password is null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }) {
      // set the use id from the token
      if (token.sub) session.user.id = token.sub;
      (session.user as AdapterUser & { role: string }).role =
        token.role as string;
      session.user.name = token.name;

      // if there is an update, set the user name -- just the name of the use is updatable
      if (trigger === "update") session.user.name = user.name;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      // Assign user fields to the token
      if (user) {
        if ("role" in user) token.role = user.role;
        if (user.name === "NO_NAME" && user.email) {
          token.name = user.email.split("@")[0];
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
