"use client";
import Button from "@/components/Button";
import TextField from "@/components/form/TextField";
import CustomLink from "@/components/Link";
import Image from "next/image";


const EsqueciSenha = () => {
    
    return (
        <article className="max-w-96 w-full flex flex-col items-center justify-center py-4 px-6 border border-light-grey-400 rounded-2xl">
            <span className="mb-4">Recuperar Senha</span>
            <form className="w-full flex flex-col items-center">
                <Image src="/forgot-password.svg" alt="Esqueci Minha Senha" className="mt-2" height={167} width={172} />
                <TextField label="E-mail" id="email" name="email" type="email" className="mt-2" required/>
                <Button type="submit" appearance="primary" className="mt-2">Enviar email</Button>
            </form>
            <span className="my-2">ou</span>
            <CustomLink href="/login" className="my-2">Já possui uma conta? Entre aqui</CustomLink>
        </article>
    );
}

export default EsqueciSenha;