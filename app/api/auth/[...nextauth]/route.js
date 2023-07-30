import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@models/userModel'
import bcrypt from 'bcryptjs'
import { connectToDB } from '@utils/database'
import { NextResponse } from 'next/server'

export const authOptions = {
  providers: [
    CredentialsProvider({
      secret: process.env.NEXTAUTH_SECRET,
      async authorize(credentials, req) {
        connectToDB()
        const { email, password } = credentials

        const user = await User.findOne({ email }).select('+password')
        if (!user) {
          throw new Error('Invalid Email or Password')
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
          throw new Error('Invalid Email or Password')
        }
        return user
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log('userId', user)
      if (user) {
        token.user = user
        token.role = user.role
      }
      // user && (token.role = user.role)
      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user = token.user
        session.user.role = token.role

        // delete password from session
        delete session?.user?.password
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
