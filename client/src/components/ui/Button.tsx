import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  restStyles?: string;
  p?: string;
  white?: boolean;
  border?: boolean;
}

const Button: FC<PropsWithChildren<Props>> = ({
  restStyles,
  p,
  white,
  border,
  children,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`transition rounded font-semibold ${
        p ? p : border ? "px-4 py-1" : "px-5 py-2"
      } ${
        white
          ? `bg-white text-teal-900 hover:bg-teal-900 hover:text-white ${
              border ? "border-4 border-teal-900" : ""
            }`
          : `bg-teal-900 text-white ${
              border
                ? "border-4 border-teal-900 hover:bg-white hover:text-teal-900"
                : "hover:bg-teal-800"
            }`
      } ${restStyles}`}
    >
      {children}
    </button>
  );
};

export default Button;
