import { getHotels } from "@/app/api/auth/hotels/action";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";

type Owner = {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
};

export type Hotel = {
    id: number;
    name: string;
    description: string;
    address: string;
    image: string | null;
    price: number;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
    owner: Owner;
};

type HomeProps = {
    searchParams?: { page?: string } | Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
    const session = await getServerSession();
    if (!session?.user) redirect("/login");

    let params: { page?: string } = {};
    if (searchParams) {
        params = typeof (searchParams as Promise<{ page?: string }>).then === "function"
            ? await searchParams
            : searchParams as { page?: string };
    }

    const currentPage = Number(params.page ?? 1);
    const limit = 8;
    
    const response = await getHotels({ page: currentPage, limit }); 
    const hotels: Hotel[] = response.data ?? [];
    const total = response.total ?? 0;
    const totalPages = Math.ceil(total / limit);

    return (
      <>
      <div className="flex flex-col items-center">
        <section className="grid grid-cols-1 gap-8 px-10 sm:grid-cols-2 sm:px-20 md:grid-cols-3 lg:grid-cols-4 xl:px-48 xl:grid-cols-4 mt-20">
            {hotels.map((hotel: Hotel) => (
              <Link key={hotel.id} href={`/hotels/${hotel.id}`}>
                <article className="flex flex-col">
                  <div className="w-64 h-48">
                    <Image 
                      src={hotel.image ? `http://localhost:3000/uploads-hotel/${hotel.image}` : "/no-hotel.jpg"}
                      width={250}
                      height={250}
                      quality={100}
                      alt="Hotel Image" 
                      className="object-cover rounded-3xl h-48 " 
                    />
                  </div>
                  <h3 className="font-bold">{hotel.name}</h3>
                  <span className="mt-1">{hotel.owner?.name ?? "Sem dono"}</span>
                  <span className="mt-1"><b>Preço:</b> R${hotel.price}</span>
                </article>
              </Link>
            ))}
        </section>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          destination="/"
        />
      </div>
      </>
    );
}