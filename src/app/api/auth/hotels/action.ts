import { Hotel } from "@/app/page";
import { cookies } from "next/headers";

export async function getHotels({ page = 1, limit = 6 }: { page?: number; limit?: number }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    const response = await fetch(`http://localhost:3000/hotels?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const data = await response.json();

    if (!data) throw new Error("Failed to fetch hotels");
    return data;
}

export async function getHotelDetail(id:number): Promise<Hotel> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    const response = await fetch(`http://localhost:3000/hotels/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) throw new Error("Failed to fetch hotel details");

    const data = await response.json();
    return data;
}