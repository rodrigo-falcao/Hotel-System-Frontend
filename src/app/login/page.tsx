import TextField from "@/components/form/TextField";
import Button from "@/components/Button";
import CustomLink from "@/components/Link";

export default function LoginPage() {
    return (
        <article className="max-w-96 w-full flex flex-col items-center justify-center py-4 px-6 border border-light-grey-400 rounded-2xl">
            <span>Entrar ou Cadastrar-se</span>
            <h3 className="w-full text-center text-xl pt-4">Bem vindo a DNC Hotel!</h3>
            <form className="w-full flex flex-col items-center justify-center">
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

