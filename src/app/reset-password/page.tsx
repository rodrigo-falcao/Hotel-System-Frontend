"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import CustomLink from "@/components/Link";
import Image from "next/image";
import TextField from "@/components/form/TextField";
import PasswordFields from "../register/PasswordFields";


const ResetPassword = () => {
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push("/reset-password"); 
    };

    
    return (
        <article className="max-w-96 w-full flex flex-col items-center justify-center py-4 px-6 border border-light-grey-400 rounded-2xl">
            <span className="mb-4">Recuperar Senha</span>
            <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
                <Image src="/reset-password.svg" alt="Esqueci Minha Senha" className="mt-2" height={167} width={172} />
                <TextField label="Token de verificação" id="token" name="token" type="text" className="mt-2" required/>
                <PasswordFields />
                <Button type="submit" appearance="primary" className="mt-2">Enviar email</Button>
            </form>
            <span className="my-2">ou</span>
            <CustomLink href="/login" className="my-2">Já possui uma conta? Entre aqui</CustomLink>
        </article>
    );
}

export default ResetPassword;