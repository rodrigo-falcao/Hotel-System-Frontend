import { cookies } from "next/headers";
import axios from "@/api";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import type { AxiosError } from "axios";
import type { User } from "next-auth"; 

type SessionUser = {
    id: number;
    name: string;
    email: string;
    accessToken: string;
    image?: string;
    avatar?: string;
};

type CustomUser = User & { accessToken?: string };

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
                        data: { accessToken },
                    } = await axios.post("/auth/login", {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    if (!accessToken) {
                        throw new Error("Access token não recebido do backend.");
                    }

                    (await cookies()).set("access_token", accessToken);

                    const payload = JSON.parse(
                        Buffer.from(accessToken.split(".")[1], "base64").toString()
                    );

                    if (!payload.sub) {
                        throw new Error("JWT payload does not contain 'sub' field.");
                    }

                    const { data: user } = await axios.get(`/users/${payload.sub}`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });

                    return {
                        ...user,
                        accessToken,
                        image: user.avatar,
                    };
                } catch (error) {
                    const axiosError = error as AxiosError;
                    if (axiosError.response?.status === 401) {
                        throw new Error("E-mail ou senha incorretos.");
                    }
                    console.error("Authorize error:", error);
                    throw new Error("Erro ao autenticar. Tente novamente.");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if ((user as CustomUser)?.accessToken) {
                token.accessToken = (user as CustomUser).accessToken;
            }
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = {
                ...(session.user as SessionUser),
                accessToken: token.accessToken as string,
                id: token.id as number,
                avatar: token.avatar as string,
            } as SessionUser;
            return session;
        },
    },
    pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };