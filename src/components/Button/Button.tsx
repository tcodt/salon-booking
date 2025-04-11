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
    <button type={type} className="primary-btn" {...rest}>
      {children}
    </button>
  );
};

export default Button;
