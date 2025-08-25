import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connDb from "@/lib/connDb";
import { JWT } from "next-auth/jwt";
import { v4 as uuidv4 } from "uuid";
import { userModel } from "@/models/user.model";
import { CustomerService } from "@/services";
import crypto from "crypto";

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
          const user_existed = await userModel.findOne({ email: user.email });
          const shortId = crypto.randomBytes(3).toString("hex");
          const getUsername = `${user.email
            ?.split("@")[0]
            ?.replace(/[^a-zA-Z0-9]/g, "")
            .trim()}${shortId}`;
          if (!user_existed && user) {
            const wooCustomer = new CustomerService();
            const response = wooCustomer.createCustomer({
              email: user.email || "",
              first_name: user.name?.split(" ")[0] || "",
              last_name: user.name?.split(" ")[1] || "",
              username: getUsername,
            });

            const woo_id = (await response).data;

            if (!woo_id) {
              throw new Error("Error creating user!");
            }

            const new_user = new userModel({
              name: user.name,
              username: getUsername,
              email: user.email,
              profile_image: user.image,
              woo_id: woo_id?.id,
            });

            await new_user.save();
            user.woo_id = woo_id?.id;
            user.username = getUsername;
            user.id = new_user._id as string;
          } else {
            if (!user_existed) {
              throw new Error("Invalid user!");
            }

            user_existed.name = user.name ?? "";
            user_existed.profile_image = user.image ?? "";
            await user_existed.save();
            user.id = user_existed._id as string;
            user.username = user_existed?.username;
            user.woo_id = user_existed?.woo_id;
          }
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
        token.id = user.id;
        token.woo_id = user.woo_id;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.woo_id = token.woo_id;
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
