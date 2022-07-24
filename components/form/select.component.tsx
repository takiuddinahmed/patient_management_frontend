import { ChangeEventHandler, FC, ReactNode, useState } from "react";

interface IProps {
  label: string;
  error: string | null;
  name: string;
  value: string;
  children?: ReactNode;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const SelectField: FC<IProps> = ({
  label,
  error,
  name,
  value,
  children,
  onChange,
}) => {
  const [blur, setBlur] = useState<boolean>(false);
  const showError = () => blur && error?.length;
  return (
    <div className="mb-6 inline-block relative w-full">
      <>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={name}
        >
          {label}
        </label>
        <select
          className={`block appearance-none w-full bg-white border hover:border-slate-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${
            showError() ? "border-red-500 placeholder:text-red-500" : ""
          }`}
          id={name}
          name={name}
          value={value || ""}
          onBlur={() => {
            setBlur(true);
          }}
          onChange={onChange}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-2 text-lg">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
        {showError() ? (
          <p className="mt-1 text-red-500 text-xs italic">{error}</p>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

SelectField.defaultProps = {};

export default SelectField;
