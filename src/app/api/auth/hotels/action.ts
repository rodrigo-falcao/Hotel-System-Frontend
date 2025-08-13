import { cookies } from "next/headers";

export async function getHotels() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    const response = await fetch("http://localhost:3000/hotels", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const data = await response.json();

    if (!data) throw new Error("Failed to fetch hotels");
    return data;
}