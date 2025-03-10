import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  ...rest
}) => {
  return (
    <button
      type={type}
      className="md:w-2/4 w-full h-12 bg-orange-500 hover:bg-orange-600 text-white transition text-base font-medium rounded-full py-2 px-4 cursor-pointer"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
