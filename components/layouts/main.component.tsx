import Navbar from "./navbar.component";

const Main = (props: any) => {
  return (
    <>
      <Navbar />
      <div className="m-6 h-full flex justify-center items-center flex-col mx-auto lg:w-1/2 ">
        {props.children}
      </div>
    </>
  );
};

export default Main;
