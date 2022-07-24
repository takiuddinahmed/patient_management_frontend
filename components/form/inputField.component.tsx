import { ChangeEventHandler, FC, useState } from "react";

interface IProps {
  label: string;
  placeholder: string;
  error: string | null;
  name: string;
  type?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

const InputField: FC<IProps> = ({
  label,
  placeholder,
  error,
  name,
  type,
  value,
  onChange,
  required,
}) => {
  const [blur, setBlur] = useState<boolean>(false);
  const showError = () => blur && error?.length;
  return (
    <div className="mb-6">
      <>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={name}
        >
          {label} <span className="text-red-500">{required ? " * " : ""}</span>
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${
            showError() ? "border-red-500 placeholder:text-red-500" : ""
          } focus:outline-none focus:shadow-outline focus:border-slate-400`}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          onBlur={() => {
            setBlur(true);
          }}
        />
        {showError() ? (
          <p className="mt-1 text-red-500 text-xs italic">{error}</p>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

InputField.defaultProps = {
  type: "text",
};

export default InputField;
