import { getHotels } from "@/app/api/auth/hotels/action";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Owner = {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
};

type Hotel = {
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

export default async function Home() {
    const session = await getServerSession();
    if (!session?.user) redirect("/login");

    const response = await getHotels(); 
    const hotels: Hotel[] = response.data ?? []; 

    return (
        <section className="grid grid-cols-1 gap-4 px-10 sm:grid-cols-2 sm:px-20 md:grid-cols-3 lg:grid-cols-4 xl:px-48 xl:grid-cols-5 mt-20">
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
    );
}