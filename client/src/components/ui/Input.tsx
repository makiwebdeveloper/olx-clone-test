import { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  inputStyles?: string;
  wrapperStyles?: string;
  error?: string;
}

const Input: FC<Props> = ({
  labelText,
  inputStyles,
  wrapperStyles,
  error,
  ...rest
}) => {
  return (
    <div className={`relative ${wrapperStyles}`}>
      <label htmlFor={rest.name}>{labelText}</label>
      {error && (
        <p className="absolute top-1 right-0 text-xs text-red-400">{error}</p>
      )}
      <input
        {...rest}
        className={`outline-none bg-gray-100 w-full rounded px-2 py-2 border-b-2 ${
          error ? "border-red-400" : "focus:border-black"
        } ${inputStyles}`}
      />
    </div>
  );
};

export default Input;
