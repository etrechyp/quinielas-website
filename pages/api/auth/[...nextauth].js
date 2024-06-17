import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import jwt from "jsonwebtoken";

const secret_key = process.env.NEXTAUTH_SECRET;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Log In",
      credentials: {
        cedula: { label: "Cédula", type: "text", placeholder: "Cédula" },
        clave: { label: "Clave", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { cedula, clave } = credentials;
          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/usuario?pageNumber=1&pageSize=1&cedula=${encodeURIComponent(cedula)}`);
          const data = await response.json();

          if (response.ok && data.message === "success" && data.usuarios.length > 0) {
            const user = data.usuarios[0];

            // Simulate password validation (replace with actual logic)
            const isValidPassword = (clave === user.clave);

            if (isValidPassword) {
              // Construct the user object to be stored in the session
              const userSession = {
                id: user.usuario_id,
                cedula: user.cedula.toString(),
                roles: [user.rol_id],
                empresa_id: user.empresa_id,
                nombres: user.nombres,
                apellidos: user.apellidos,
                fecha_nacimiento: user.fecha_nacimiento,
              };

              // Generate JWT token with userSession data
              const access_token = jwt.sign(userSession, secret_key, { expiresIn: '1h' });

              // Return user data and access token
              return {
                success: true,
                message: "Logged in successfully",
                user: userSession,
                access_token,
              };
            } else {
              // Password validation failed
              return null;
            }
          } else {
            // User not found or other error
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
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
