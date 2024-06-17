import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import jwt from "jsonwebtoken";

const secret_key = process.env.NEXTAUTH_SECRET;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Log In",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const data = await (await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(credentials)
        })).json()

        if (data) {
          return data
        }

        return null
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
      }
      if (Date.now() < Date(token.exp)) {
        console.log("token expired")
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        let checkJWT = jwt.verify(token.access_token, secret_key);
        session.user = checkJWT;
        session.user.access_token = token.access_token;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
    async signIn({ user }) {
      if (user.success) {
        return true;
      } else {
        return `/error?error=${user.message}`;
      }
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/error",
  },
  events: {
    async session(message) { /* console.log({session: message.session.user}) */ },
    async signIn(message) { /* console.log({sigin: message}) */ },
  }
});

//TODO: 