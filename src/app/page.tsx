import Alert from "@/components/Alert";
import CustomLink from "@/components/Link";
import ImageField from "@/components/form/ImageField";
import Pagination from "@/components/Pagination";
import TextField from "@/components/form/TextField";

export default function Home() {
  return (
    <section>
      pagina principal
      <CustomLink href="/teste">Teste</CustomLink>
      <TextField label='Nome Completo' id="full_name" name="full_name" error="Campo obrigatório" />
      <ImageField label="Selecione a foto" id="profile_picture" name="profile_picture" />
      <Pagination currentPage={100} totalPages={100} destination="/" />
      <Alert type="success">Esse é um feedback para o meu usuário</Alert>
      <Alert type="danger">Esse é um feedback de erro para o meu usuário</Alert>
    </section>
  );
}

