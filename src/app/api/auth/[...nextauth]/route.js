import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        let existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (!existingUser) {
          const user = await prisma.user.create({
            data: {
              email: email,
              name: email.split("@")[0],
              role: "USER",
              password: await bcrypt.hash(password, 10),
            },
          });

          return user;
        } else {
          const isValid = await bcrypt.compare(password, existingUser.password);

          if (!isValid) {
            throw new Error("Incorrect password");
          }
          return existingUser;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              role: "USER",
            },
          });
        }

        return existingUser;
      } catch (error) {
        console.error("Error checking or creating user: ", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },


  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
