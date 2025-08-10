import { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string | undefined;
}


const TextField = ({ id, type='text' , label, className, error,  ...props }: TextFieldProps) => {
    const defaultStyle = "border border-light-grey-300 rounded-lg w-full px-4 p-2";
    const errorStyle = "border border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-1";

    return (
        <div className={`w-full ${className}`}>
            <label htmlFor={id} className="sr-only">{label}</label>
            <input id={id} type={type} placeholder={label} className={`${defaultStyle} ${error ? errorStyle : ''}`} {...props} />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default TextField;