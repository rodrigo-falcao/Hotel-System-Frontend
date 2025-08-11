import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "E-mail", type: "email" },
                password: { label: "Senha", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                console.log("Email:", credentials.email, "Password:", credentials.password);
                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }