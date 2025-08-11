"use client";
import Button from "@/components/Button";
import ImageField from "@/components/form/ImageField";
import RadioGroup from "@/components/form/RadioGroup";
import TextField from "@/components/form/TextField";
import CustomLink from "@/components/Link";

const CadastrarPage = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;
        // const name = form.name.value;
        const avatar = form.avatar.files[0];
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        // formData.append("name", name);
        formData.append("avatar", avatar);
        const response = await fetch("/api/auth/cadastrar", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (response.ok) {
            // Handle successful registration
        } else {
            // Handle registration error
        }
        console.log(data);

    }
    return (
        <article className="max-w-96 w-full flex flex-col items-center justify-center py-4 px-6 border border-light-grey-400 rounded-2xl">
            <span className="mb-4">Entrar ou Cadastrar-se</span>
            <form className="w-full" onSubmit={handleSubmit}>
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