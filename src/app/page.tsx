import TextField from "@/components/form/TextField";
import CustomLink from "@/components/Link";

export default function Home() {
  return (
    <section>
      pagina principal
      <CustomLink href="/teste">Teste</CustomLink>
      <TextField label='Nome Completo' id="full_name" name="full_name" error="Campo obrigatório" />
    </section>
  );
}

