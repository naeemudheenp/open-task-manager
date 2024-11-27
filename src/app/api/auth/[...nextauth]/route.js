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
        company: { label: " company", type: "company" },
      },
      async authorize(credentials) {
        const { email, password, company } = credentials;

        if (!email || !password || !company) {
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
              company: company,
            },
          });

          return user;
        } else {
          const isValid = await bcrypt.compare(
            password,
            existingUser?.password || ""
          );

          if (!isValid) {
            throw new Error("Incorrect password");
          }
          return existingUser;
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: {
            email: true,
            company: true,
            role: true,
          },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.company = dbUser.company;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.company = token.company;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
