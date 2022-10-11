import Navbar from "./navbar.component";
import { FC } from "react";

interface IProps {
  loading?: boolean;
  children?: any;
}

const Main: FC<IProps> = ({ loading, children }) => {
  return (
    <>
      <Navbar login={true} user={''}></Navbar>
      <div className="m-6 h-full flex justify-center items-center flex-col mx-auto lg:w-1/2 ">
        {children}
      </div>
    </>
  );
};

export default Main;
