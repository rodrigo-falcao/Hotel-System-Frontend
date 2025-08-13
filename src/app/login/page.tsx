"use client";
import TextField from "@/components/form/TextField";
import Button from "@/components/Button";
import CustomLink from "@/components/Link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.ok) {
            router.push("/");
        } else {
            // Exiba mensagem de erro se quiser
        }
    };
    return (
        <article className="max-w-96 w-full flex flex-col items-center justify-center py-4 px-6 border border-light-grey-400 rounded-2xl">
            <span>Entrar ou Cadastrar-se</span>
            <h3 className="w-full text-center text-xl pt-4">Bem vindo a DNC Hotel!</h3>
            <form className="w-full" onSubmit={handleSubmit}>
                <TextField label="Email" id="email" name="email" type="email" className="mt-2" required/>
                <TextField label="Senha" id="password" name="password" type="password" className="mt-2" required/>
                <Button type="submit" appearance="primary" className="mt-2">Entrar</Button>
            </form>
            <span className="my-2">ou</span>
            <CustomLink href="/register" className="my-2">Cadastre-se</CustomLink>
            <CustomLink href="/forgot-password">Esqueci minha senha</CustomLink>
        </article>
    );
}

