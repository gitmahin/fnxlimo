import "next-auth"
import { DefaultSession } from "next-auth"

declare module "next-auth" {

    interface User {
        username?: string,
        email?: string,
        image?: string,
        name?: string,
        uuid?: string
    }
    interface Session {
        user: {
            username?: string,
            email?: string,
            image?: string,
            name?: string,
            uuid?: string
        } & DefaultSession['user']

    }
}


declare module 'next-auth/jwt' {
    interface JWT {
        username?: string,
        email?: string,
        image?: string,
        name?: string,
        uuid?: string
    }
}