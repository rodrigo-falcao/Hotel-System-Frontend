"use client";
import { Hotel } from "@/app/page";
import { CalendarField } from "@/components/Calendar/CalendarField"
import TextField from "@/components/form/TextField";
import { ChangeEvent, useState } from "react";

type BookingHotelFormType = {
    hotel: Hotel;
}


const HotelBookingForm = ({ hotel }: BookingHotelFormType) => {
    const today = new Date().toISOString().substring(0, 10);
    const [checkinDate, setCheckinDate] = useState<string | undefined>(today);
    const [checkoutDate, setCheckoutDate] = useState<string | undefined>(today);

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
                label="Check-in Date" 
                className="w-full m-5" 
                min={today} 
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCheckinDate(event.target.value);
                }} 
            />
            <CalendarField 
                id="checkOut" 
                name="checkOut" 
                label="Check-out Date" 
                className="w-full m-5" 
                min={checkinDate ?? today} 
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCheckoutDate(event.target.value);
                }} 
            />
            </div>
        </form>
    )
}

export default HotelBookingForm;