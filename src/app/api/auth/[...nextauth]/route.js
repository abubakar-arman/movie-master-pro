import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

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
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // authorization logics
                // get inputs
                const { username, password } = credentials
                // find user from db
                const user = userList.find(u => u.name === username)
                if (!user) return null
                // verify user credential
                const isPasswordOk = password == user.password
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
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }