import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connDb from "@/lib/connDb";
import { JWT } from "next-auth/jwt";
import { v4 as uuidv4 } from "uuid";
import { userModel } from "@/models/user.model";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        await connDb();

        try {
          const uniqueID = uuidv4();
          const user_existed = await userModel.findOne({ email: user.email });
          if (!user_existed && user) {
            const new_user = new userModel({
              uuid: uniqueID,
              name: user.name,
              username: user.email
                ?.split("@")[0]
                ?.replace(/[^a-zA-Z0-9]/g, "")
                .trim(),
              email: user.email,
              profile_image: user.image,
            });

            await new_user.save();
            user.uuid = uniqueID;
          } else {
            // if(user_existed.provider != account.provider){
            //     throw new Error("It seems you've already created an account using another social account or Single Sign-On (SSO). Please sign in using that method to proceed.")
            // }

            if (!user_existed) {
              throw new Error("Invalid user!");
            }

            user_existed.name = user.name ?? "";
            user_existed.username =
              user.email
                ?.split("@")[0]
                ?.replace(/[^a-zA-Z0-9]/g, "")
                .trim() ?? "";
            user_existed.profile_image = user.image ?? "";
            await user_existed.save();

            user.uuid = user_existed?.uuid;
          }

          user.username = user.email
            ?.split("@")[0]
            ?.replace(/[^a-zA-Z0-9]/g, "")
            .trim();
        } catch (error: any) {
          throw new Error(error);
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.uuid = user.uuid;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.email = token.email;
        session.user.uuid = token.uuid;
      }
      return session;
    },
  },
  pages: {
    error: "/login",
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        secure: true, // ensure this is true in production
        path: "/",
      },
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days for token expiration
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
