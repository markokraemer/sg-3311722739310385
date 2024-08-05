import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Here you would typically check the credentials against your database
        if (credentials.username === "user" && credentials.password === "password") {
          return { id: 1, name: "Test User", email: "user@example.com" };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    }
  }
});