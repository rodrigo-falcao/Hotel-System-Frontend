"use client";
import TextField from "@/components/form/TextField";
import { useState } from "react";

const PasswordFields = () => {
    const [passwordMatches, setPasswordMatches] = useState<boolean | null>(null);
    const [touched, setTouched] = useState(false);

    const handlePasswordChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        setTouched(true);
        const confirmPassword = event.target.value;
        const passwordInput = document.getElementById("password") as HTMLInputElement;
        const password = passwordInput.value;

        setPasswordMatches(password === confirmPassword);
    };

    return (
        <>
            <TextField label="Senha" id="password" name="password" type="password" className="mt-2" required/>
            <TextField 
                label="Confirme sua Senha" 
                id="confirm-password" 
                name="confirm-password" 
                onChange={handlePasswordChange} 
                type="password" 
                className="mt-2" 
                required
                error={touched && passwordMatches === false ? 'Campo de senha não coincide' : undefined}
                />
        </>
    );
}

export default PasswordFields;
