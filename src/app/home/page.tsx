import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type SearchParamsType = {
    page?: string;
    query?: string;
};

type HomeProps = {
    searchParams?: SearchParamsType | Promise<SearchParamsType>;
};

export default async function Home({ searchParams }: HomeProps) {
    const session = await getServerSession();
    if (!session?.user) redirect("/login");

    let params: SearchParamsType = {};
    if (searchParams) {
        params = typeof (searchParams as Promise<SearchParamsType>).then === "function"
            ? await searchParams
            : searchParams as SearchParamsType;
    }

    const currentPage = Number(params.page ?? 1);

    return (
        <section>
            HOME Página atual: {currentPage}
        </section>
    );
}