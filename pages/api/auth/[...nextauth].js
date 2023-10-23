import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: '2ce329ddaa975d202e8c',
      clientSecret: '4dc939a7ebed6caf9dc9650992c0492fe77934e1',
    }),
  ],
  secret : 'qwer1234',
  adapter : MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions); 