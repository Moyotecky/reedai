import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const FormInput = ({ label, error, className = "", ...props }: FormInputProps) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                className={`
                    w-full px-4 py-3 rounded-xl border bg-white
                    focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all
                    placeholder:text-gray-400 text-gray-900 font-sans
                    ${error ? "border-red-300 focus:border-red-300 focus:ring-red-100" : "border-gray-200"}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500 mt-0.5">{error}</span>
            )}
        </div>
    );
};

export default FormInput;
