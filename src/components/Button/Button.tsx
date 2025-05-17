import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "add" | "update" | "delete";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  ...rest
}) => {
  const baseClasses = "px-4 h-12 py-2 font-medium transition-colors w-full";

  const variantClasses = {
    primary: "primary-btn",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 border-2 border-gray-300 rounded-xl",
    add: "bg-sky-100 text-sky-500 hover:bg-sky-200 border-2 border-sky-200 rounded-xl",
    update:
      "bg-green-100 text-green-500 hover:bg-green-200 border-2 border-green-200 rounded-xl",
    delete:
      "bg-red-100 text-red-500 hover:bg-red-200 border-2 border-red-200 rounded-xl",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]}`;

  return (
    <button type={type} className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;
