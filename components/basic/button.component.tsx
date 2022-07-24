import { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  color?: string;
}

const Button: FC<IProps> = ({ children, type, bgColor, color }) => {
  return (
    <>
      <button
        type={type}
        className={`${bgColor} ${color} px-4 py-2 rounded-lg `}
      >
        {children}
      </button>
    </>
  );
};

Button.defaultProps = {
  type: "button",
  bgColor: "bg-cyan-600",
  color: "text-white",
};

export default Button;
