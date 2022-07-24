import { stringify } from "querystring";
import { FC, FormEventHandler, ReactNode, useState } from "react";
import Alert from "../basic/alert.component";

interface IProps {
  onSubmit?: Function;
  children?: ReactNode;
  error?: any;
}

const Form: FC<IProps> = ({ onSubmit, children, error }) => {
  const [showAleart, setShowAleart] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState("");
  const closeAlert = () => {
    setShowAleart(false);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (
      error &&
      Object.entries(error).some(([key, value]) => (value as string)?.length)
    ) {
      setShowAleart(true);
      const msg = Object.entries(error)
        .map(([key, value]) => value as string)
        .join(" ");
      setErrMsg(msg);
    } else if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <>
      <div className=" transition duration-500 lg:w-2/3">
        <Alert open={showAleart} msg={errMsg} close={closeAlert} />
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        >
          {children}
        </form>
      </div>
    </>
  );
};

export default Form;
