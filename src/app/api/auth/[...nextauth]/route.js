//Next-auth config

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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, //using google as 0auth provider
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        company: { label: " company", type: "company" },
      },
      async authorize(credentials) {
        //Credential mode
        const { email, password, company } = credentials;



        let existingUser = await prisma.user.findUnique({
          where: { email },
        });
        let isCompanyExist;
        if (company) {
          isCompanyExist = await prisma.user.findFirst({
            where: { company: company },
          });
        }

        if (!existingUser) {
          const user = await prisma.user.create({
            data: {
              email: email,
              name: email.split("@")[0],
              role: !isCompanyExist ? "ADMIN" : "USER",//Making first user as admin
              password: await bcrypt.hash(password, 10),//crypting password
              company: company,
            },
          });

          return user;
        } else {
          console.log(existingUser?.password, "password");

          const isValid = await bcrypt.compare(
            password,
            existingUser?.password
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
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error checking or creating user: ", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { email: true, company: true, role: true, department: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.company = dbUser.company;
        }
      } else {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { email: true, company: true, role: true, department: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.company = dbUser.company;
          token.department = dbUser.department
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.company = token.company;
        session.user.department = token.department
      }
      return session;
    },
  },

  pages: {
    signIn: "/",
    error: "/login-error",
    signOut: '/'
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
