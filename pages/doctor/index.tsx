import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/basic/button.component";
import Navbar from "../../components/layouts/navbar.component";
import CardShow from "../../components/temp/cardShow";
import { getLocalHostData } from "../../utils/getLocalData.util";

interface IUser {
  firstName?: string;
  lastName?: string;
  userRole?: string;
  cardId?: string;
}

const Home: NextPage = () => {
  const [rfid, setRfid] = useState<string>("");
  const [read, setRead] = useState<number>(0);
  const [user, setUser] = useState<IUser | null>(null);
  const [showCard, setShowCard] = useState<boolean>(false);
  const router = useRouter();

  const showPatient = () => {
    return (
      <>
        <div>
          <h1 className="text-4xl text-center">
            Welcome {user?.firstName} {user?.lastName}
          </h1>
          <h2 className="text-2xl text-center mt-2">
            Your Card Id : {user?.cardId}
          </h2>
        </div>
      </>
    );
  };

  const showDoctor = (show: boolean) => {
    console.log(show);
    return (
      <>
        <div className="flex justify-center items-start flex-col">
          <h1 className="text-4xl text-center">
            Welcome {user?.firstName} {user?.lastName} {show}
          </h1>

          {!show ? (
            <div className="mx-auto mt-5">
              <Button
                onClick={() => {
                  setShowCard(true);
                }}
              >
                Access Patient
              </Button>
            </div>
          ) : (
            <CardShow />
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar login={user != null} />
      <div className="flex justify-center  items-start  mt-40 h-screen w-screen ">
        {user?.userRole == "patient" ? showPatient() : showDoctor(showCard)}
      </div>
    </>
  );
};

export default Home;
