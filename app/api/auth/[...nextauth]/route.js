import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/userModel";
import bcrypt from "bcryptjs";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const authOptions = {
  providers: [
    CredentialsProvider({
      secret: process.env.NEXTAUTH_SECRET,
      async authorize(credentials, req) {
        connectToDB();
        const { email, password } = credentials;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          throw new Error("Invalid Email or Password");
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        token.user = user;
        token.role = user.role;
      }
      // user && (token.role = user.role)
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      if (session.user) {
        let user = session.user;
        session.user = {
          name: token?.name || token.user?.name,
          email: token?.email || token.user?.email,
          phone: token?.phone || token.user?.phone,
          role: token?.role || token.user?.role,
          avatar: token?.avatar || token.user?.avatar,
        };
        // session.user = token.user;
        // session.user.role = token.role;

        // delete password from session
        delete session?.user?.password;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
