import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
    email?: string;
    image?: string;
    name?: string;
    id?: string;
    woo_id?: number;
  }
  interface Session {
    user: {
      username?: string;
      email?: string;
      image?: string;
      name?: string;
      id?: string;
      woo_id?: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    email?: string;
    image?: string;
    name?: string;
    id?: string;
    woo_id?: number;
  }
}
