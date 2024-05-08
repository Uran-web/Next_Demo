import { NextRequest } from 'next/server';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import dbConnect from '@/backend/config/dbconnect';
import User, { IUser } from '@/backend/models/user';

type Credentials = {
  email: string;
  password: string;
};

type Token = {
  user: IUser;
};

async function auth(req: NextRequest, res: any) {
  return await NextAuth(req, res, {
    session: {
      strategy: 'jwt',
    },
    providers: [
      CredentialsProvider({
        // @ts-ignore
        async authorize(credentials: Credentials) {
          dbConnect();

          const { email, password } = credentials;

          const user = await User.findOne({ email }).select('+password');

          if (!user) {
            throw new Error('Invalid email or password');
          }

          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (!isPasswordMatch) {
            throw new Error('Invalid email or password');
          }

          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        const jwtToken = token as Token;

        user && (token.user = user);

        // Update session when user is updated
        if (req.url?.includes('/api/auth/session?update')) {
          // Hit the database and return the updated user
          const updatedUser = await User.findById(jwtToken?.user?._id);
          token.user = updatedUser;
        }

        return token;
      },

      session: async ({ session, token }) => {
        session.user = token.user as IUser;

        // @ts-ignore
        delete session?.user?.password;

        return session;
      },
    },
    pages: {
      signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}

export { auth as GET, auth as POST };