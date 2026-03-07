import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs"

const userList = [
    { name: 'arman', password: '123' },
    { name: 'raihan', password: '456' }
]

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter password" }
            },
            async authorize(credentials, req) {
                // AUTHORIZATION LOGICS //
                // get inputs
                const { email, password } = credentials

                // find user from db
                const user = await dbConnect("users").findOne({ email })
                if (!user) return null

                // verify user credential
                const isPasswordOk = await bcrypt.compare(password, user.password)
                console.log({
                    plain: password,
                    plainHashed: await bcrypt.hash(password, 10),
                    dbHashed: user.password
                });

                if (!isPasswordOk) return null
                return user

                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
                // const user = await res.json()

                // // If no error and we have user data, return it
                // if (res.ok && user) {
                //     return user
                // }
                // // Return null if user data could not be retrieved
                // return null
            }
        })
        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
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
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }