import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/api";
import { cookies } from "next/headers";

type SessionUser = {
    id: number;
    name: string;
    email: string;
    access_token: string;
    image?: string;
    avatar?: string;
};

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "E-mail", type: "email" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) throw new Error("No credentials provided!");

                try {
                    const {
                        data: { access_token },
                    } = await axios.post("/auth/login", {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    (await cookies()).set("access_token", access_token);

                    const payload = JSON.parse(
                        Buffer.from(access_token.split(".")[1], "base64").toString()
                    );

                    if (!payload.sub) {
                        throw new Error("JWT payload does not contain 'sub' field.");
                    }

                    const { data: user } = await axios.get(`/users/${payload.sub}`, {
                        headers: { Authorization: `Bearer ${access_token}` },
                    });

                    return {
                        ...user,
                        access_token,
                        image: user.avatar,
                    };
                } catch (error) {
                    console.error("Authorize error:", error);
                    throw new Error("Authentication failed.");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ session, token }) {
            session.user = token as SessionUser;
            return session;
        },
    },
    pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };