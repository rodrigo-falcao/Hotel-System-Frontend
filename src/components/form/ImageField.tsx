"use client"
import Image from "next/image";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";


type ImageFieldProps = InputHTMLAttributes<HTMLInputElement> &  {
    label: string;
    name: string;
}

const MaxSize = 1500 * 1024;

const ImageField = ({ id, label, name }: ImageFieldProps) => {
    const [image, setImage] = useState<string | null | ArrayBuffer>(null);
    const [exceededImageSize, setExceededImageSize] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
        const file = event.target.files?.[0];
        const reader = new FileReader();

        setExceededImageSize(file?.size as number > MaxSize);

        reader.onloadend = () => {
            setImage(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center ">
            <Image 
                src={image ? (image as string) : '/image-profile.png'} 
                width={100} 
                height={100} 
                alt="Profile picture" 
                className="rounded-full relative object-cover w-24 h-24"  
            />
            <label 
                htmlFor={id}
                className="py-4 px-6 w-full border-none rounded-lg font-bold text-center cursor-pointer"
            >
                {label}
            </label>
            {exceededImageSize && (
                <span className="text-red-500 text-sm mt-2">
                    Imagem muito grande! O tamanho máximo é 1.5MB.
                </span>
            )}
            <input type="file" id={id} name={name} className="hidden" onChange={handleInputChange} />
        </div>
    );
};

export default ImageField;