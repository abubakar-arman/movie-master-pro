
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
// import { collections, dbConnect } from "@/lib/dbConnect";
import { loginUser } from "@/actions/server/auth";

const providers = [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        credentials: {
            // email: { label: "Email", type: "email", placeholder: "Enter your email" },
            // password: { label: "Password", type: "password", placeholder: "Enter password" }
        },
        async authorize(credentials, req) {
            const { email, password } = credentials
            // logger.debug({ credentials });
            // AUTHORIZATION LOGICS //
            const user = await loginUser({ email, password })
            if (!user) return null

            return user
        }
    }),
    GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    })
    // ...add more providers here
]

const callbacks = {
    // async signIn({ user, account, profile, email, credentials }) {
    //     logger.debug('OAuth login :', { user, account, profile, email, credentials })
    //     try {
    //         const { id, ...rest } = user
    //         const payload = {
    //             ...rest,
    //             provider: account.provider,
    //             providerAccoundId: account.providerAccountId,
    //             role: "user",
    //             createdAt: new Date().toISOString()
    //         }

    //         const userExists = await dbConnect(collections.USERS).findOne({ email: user.email })
    //         if (!userExists) {
    //             const result = await dbConnect(collections.USERS).insertOne(payload)
    //             logger.debug("user doesn't exist. inserting user into db");
    //         } else {
    //             logger.debug("user exists. logging in");
    //         }
    //         return true
    //     } catch (err) {
    //         return false
    //     }
    // },
    async redirect({ url, baseUrl }) {
        return baseUrl
    },
    async session({ session, token, user }) {
        if (token) {
            session.role = token.role
        }
        return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
            token.email = user.email
            token.role = user.role
        }
        return token
    }
}

export const authOptions = {
    // Configure one or more authentication providers
    providers,
    callbacks,
    pages: {
        signIn: "/login",
    }
}
