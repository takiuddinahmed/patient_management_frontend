import { FC } from "react";
import FadeIn from "react-fade-in";

interface IProps {
  msg: string;
  open?: boolean;
  close: Function;
}

const Alert: FC<IProps> = ({ msg, open, close }) => {
  return (
    <>
      {true ? (
        <FadeIn visible={open}>
          <div className="h-16 max-h-16 bg-rose-300 w-full my-2 flex justify-between items-center p-4 text-white rounded ">
            <div>{msg}</div>
            <div>
              <button
                className="py-2 px-3 transition duration-100 hover:scale-125"
                onClick={(e) => {
                  close();
                }}
              >
                x
              </button>
            </div>
          </div>
        </FadeIn>
      ) : (
        ""
      )}
    </>
  );
};

export default Alert;
