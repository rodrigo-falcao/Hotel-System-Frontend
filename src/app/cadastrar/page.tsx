"use client";
import Button from "@/components/Button";
import ImageField from "@/components/form/ImageField";
import RadioGroup from "@/components/form/RadioGroup";
import TextField from "@/components/form/TextField";
import CustomLink from "@/components/Link";
import { signup } from "../api/auth/signup/route";

const CadastrarPage = () => {
    
    return (
        <article className="max-w-96 w-full flex flex-col items-center justify-center py-4 px-6 border border-light-grey-400 rounded-2xl">
            <span className="mb-4">Entrar ou Cadastrar-se</span>
            <form className="w-full" action={signup}>
                <ImageField label="Selecionar Foto" id="avatar" name="avatar"/>
                <TextField label="Digite seu nome" id="name" name="name" type="text" className="mt-2" required/>
                <TextField label="E-mail" id="email" name="email" type="email" className="mt-2" required/>
                <TextField label="Senha" id="password" name="password" type="password" className="mt-2" required/>
                <TextField label="Confirme sua Senha" id="confirm-password" name="confirm-password" type="password" className="mt-2" required/>
                <RadioGroup options={[
                    { label: "Sim", value: "ADMIN", id: "yes" },
                    { label: "Não", value: "USER", id: "no" }
                ]} name="role" label="Você Deseja Anunciar uma hospedagem?" className="my-2"/>
                <Button type="submit" appearance="primary" className="mt-2">Cadastrar</Button>
            </form>
            <span className="my-2">ou</span>
            <CustomLink href="/login" className="my-2">Já possui uma conta? Entre aqui</CustomLink>
        </article>
    );
}

export default CadastrarPage;