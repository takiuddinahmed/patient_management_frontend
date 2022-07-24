import { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  color?: string;
  onClick?: Function;
}

const Button: FC<IProps> = ({ children, type, bgColor, color, onClick }) => {
  return (
    <>
      <button
        type={type}
        className={`${bgColor} ${color} px-4 py-2 rounded-lg `}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
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
