import { ButtonHTMLAttributes } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    fullWidth?: boolean;
}

const FormButton = ({
    children,
    variant = "primary",
    fullWidth = false,
    className = "",
    ...props
}: FormButtonProps) => {
    const variants = {
        primary: "bg-[#2EC4B6] hover:bg-[#25a094] text-white shadow-sm border border-transparent",
        secondary: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm",
        ghost: "bg-transparent hover:bg-gray-50 text-gray-600 hover:text-gray-900",
    };

    return (
        <button
            className={`
                py-3 px-6 rounded-xl font-medium transition-all duration-200
                flex items-center justify-center gap-2
                active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed
                ${variants[variant]}
                ${fullWidth ? "w-full" : ""}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default FormButton;
