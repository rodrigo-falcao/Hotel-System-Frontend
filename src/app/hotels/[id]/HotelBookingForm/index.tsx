"use client";
import { CalendarField } from "@/components/Calendar/CalendarField"
import { ChangeEvent, useState } from "react";
import { Hotel } from "@/app/page";
import Button from "@/components/Button";
import TextField from "@/components/form/TextField";

type BookingHotelFormType = {
    hotel: Hotel;
}

const HotelBookingForm = ({ hotel }: BookingHotelFormType) => {
    const today = new Date().toISOString().substring(0, 10);
    const [checkinDate, setCheckinDate] = useState<string | undefined>(today);
    const [checkoutDate, setCheckoutDate] = useState<string | undefined>(today);
    
    const getNightsInHotel = (checkin: string | undefined, checkoutDate: string | undefined) => {
        if (!checkin || !checkoutDate) return 0;
        
        const checkinDate = new Date(checkin);
        const checkout = new Date(checkoutDate);
        const timeDiff = checkout.getTime() - checkinDate.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return nights;
    }
    
    const estimatedPrice = getNightsInHotel(checkinDate, checkoutDate) * hotel.price;
    return (
        <form action="" className="flex w-full flex-col mt-0">
            <TextField 
                id="hotelID"
                name="hotelID"
                label="ID do Hotel"
                defaultValue={hotel.id}
                readOnly
                hidden
            />
            <div className="flex w-full">
            <CalendarField 
                id="checkIn" 
                name="checkIn" 
                label="Data de check-in" 
                className="w-full m-5" 
                min={today} 
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCheckinDate(event.target.value);
                }} 
            />
            <CalendarField 
                id="checkOut" 
                name="checkOut" 
                label="Data de check-out" 
                className="w-full m-5" 
                min={checkinDate ?? today} 
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCheckoutDate(event.target.value);
                }} 
            />
            </div>
            <div className="flex w-full justify-between font-bold mt-6">
                <span>Valor total</span>
                <span>R${estimatedPrice}</span>
            </div>
            <hr className="mt-6" />
            <Button appearance="primary" type="submit" disabled={false} className="mt-10 block">Reservar</Button>
        </form>
    )
}

export default HotelBookingForm;