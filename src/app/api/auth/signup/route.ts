"use server"
import axios from "@/api";
import { redirect } from "next/navigation";


type SignupState = {
    error?: boolean;
    message?: string;
};

export async function signup(prevState: SignupState, formData: FormData) {
    try {
        const avatar = formData.get('avatar') as File | null;
        const formDataAvatar = new FormData();
        if (avatar && avatar.size) {
            formDataAvatar.set('avatar', avatar);
        }

        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role')
        };

        // Use o endpoint correto conforme seu backend
        const { data } = await axios.post('/users', payload);

        if (avatar && avatar.size) {
            await axios.post('/users/avatar', formDataAvatar, {
                headers: {
                    Authorization: `Bearer ${data.access_token}`
                }
            });
        }

        redirect('/login');
    } catch (error) {
        console.error('Signup error:', error);
        return { ...prevState, error: true, message: 'Não foi possível cadastrar usuário' };
    }
}