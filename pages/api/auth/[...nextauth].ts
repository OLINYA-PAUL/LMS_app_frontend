import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_GITHUB_CLIENT_SECRET_ID ?? "",
      clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_SECRET_ID ?? "",
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  // secret: process.env.SECRET_NUMBER,
};

export default NextAuth(authOptions);
