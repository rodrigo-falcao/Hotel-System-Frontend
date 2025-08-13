"use client";
import Button from "@/components/Button";
import ImageField from "@/components/form/ImageField";
import RadioGroup from "@/components/form/RadioGroup";
import TextField from "@/components/form/TextField";
import CustomLink from "@/components/Link";
import api from "@/api";
import { useState } from "react";
import PasswordFields from "./PasswordFields";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type SessionUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string;
};

const CadastrarPage = () => {
    const router = useRouter();
    const [feedback, setFeedback] = useState<string | null>(null);
    const { data: session } = useSession();
    const token = (session?.user as SessionUser)?.accessToken;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const payload = {
            name: (form.elements.namedItem("name") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            password: (form.elements.namedItem("password") as HTMLInputElement).value,
            role: (form.elements.namedItem("role") as HTMLInputElement).value,
            avatar: null
        };

        try {
            await api.post("/users", payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFeedback("Usuário cadastrado com sucesso!");
            router.push("/login");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            setFeedback("Erro ao cadastrar usuário. Tente novamente.");
        }
    };
    
    return (
        <article className="max-w-96 w-full flex flex-col items-center justify-center py-4 px-6 border border-light-grey-400 rounded-2xl">
            <span className="mb-4">Entrar ou Cadastrar-se</span>
            <form className="w-full" onSubmit={handleSubmit}>
                <ImageField label="Selecionar Foto" id="avatar" name="avatar"/>
                <TextField label="Digite seu nome" id="name" name="name" type="text" className="mt-2" required/>
                <TextField label="E-mail" id="email" name="email" type="email" className="mt-2" required/>
                <PasswordFields />
                <RadioGroup options={[
                    { label: "Sim", value: "ADMIN", id: "yes" },
                    { label: "Não", value: "USER", id: "no" }
                ]} name="role" label="Você Deseja Anunciar uma hospedagem?" className="my-2"/>
                <Button type="submit" appearance="primary" className="mt-2" onClick={() => console.log("Botão clicado!")}>Cadastrar</Button>
            </form>
            {feedback && (
                <span className={`my-2 ${feedback.includes("sucesso") ? "text-green-600" : "text-red-600"}`}>
                    {feedback}
                </span>
            )}
            <span className="my-2">ou</span>
            <CustomLink href="/login" className="my-2">Já possui uma conta? Entre aqui</CustomLink>
        </article>
    );
}

export default CadastrarPage;