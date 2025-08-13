import { cookies } from "next/headers";
import { getHotelDetail } from "@/app/api/auth/hotels/action";
import DetailPage from "@/components/DetailPage";
import Image from "next/image";
import HotelBookingForm from "./HotelBookingForm";

async function getUserDetail(id: number) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;


    const response = await fetch(`http://localhost:3000/users/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
    });
    if (!response.ok) return null;
    return response.json();
}

type Params = {
    id: string;
};

type HotelDetailProps = {
    params: Params;
};


const HotelDetail = async ({ params }: HotelDetailProps) => {
    const resolvedParams = await Promise.resolve(params);
    const hotel = await getHotelDetail(Number(resolvedParams.id));
    const owner = hotel.ownerId ? await getUserDetail(hotel.ownerId) : null;

    return (
        <DetailPage 
            previousPage="/" 
            title={hotel.name}
            image={{
                src: hotel.image ? `http://localhost:3000/uploads-hotel/${hotel.image}` : "/no-hotel.jpg",
                alt: hotel.name
            }} 
            asideContainer={{
                title: <> R${hotel.price} <span>&nbsp;</span>noite </>,
                children: <HotelBookingForm hotel={hotel} />
            }}
        >
        <div className="mt-4 flex">
            <Image
                src="/image-profile.png"
                alt="Foto do anfitrião"
                width={56}
                height={56}
                className="rounded-full w-14 h-14 object-cover"
            />
            <div className="flex flex-col ml-2 justify-center">
                <b>Anfitriã(o): {owner ? owner.name : "Não informado"}</b>
                <span className="font-medium">Desde: {owner ? new Date(owner.createdAt).toLocaleDateString() : "Não informado"}</span>
            </div>
        </div>
        <hr className="mt-4" />
        <div className="mt-4 flex flex-col">
            <h3 className="font-bold text-2xl">Endereço:</h3>
            <span className="mt-4">{hotel.address}</span>
        </div>
        <div className="mt-4 flex flex-col">
            <h3 className="font-bold text-2xl">Sobre este espaço:</h3>
            <span className="mt-4">{hotel.description}</span>
        </div>
        </DetailPage>
    );
}

export default HotelDetail;