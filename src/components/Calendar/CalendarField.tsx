type CalendarFieldsProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string | null;
};

export const CalendarField = ({id, className, name, min, label, error, ...props }: CalendarFieldsProps) => {
    const defaultStyle = "border border-light-grey-600 rounded-lg w-full px-4 py-2";
    const errorStyle = "border-red-500";

    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <input 
                type="date" 
                id={id} 
                name={name}
                aria-label={label}
                min={min}
                className={`${defaultStyle} ${error ? errorStyle : ''}`}  
                {...props}          
            />
            {error && <span className="error">{error}</span>}
        </div>
    )
}