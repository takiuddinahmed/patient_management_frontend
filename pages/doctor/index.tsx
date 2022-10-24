import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/basic/button.component";
import Navbar from "../../components/layouts/navbar.component";
import CardShow from "../../components/temp/cardShow";

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
  const [patientId, setPatientId] = useState<string>("");
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
            Inserted Card Id : {user?.cardId}
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

          <div className="mt-5">
            <span className="text-2xl">Access Patient Manually</span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="form-control w-full max-w-xs px-3 mt-4">
                <input
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  type="text"
                  placeholder="Patient Id"
                  className="input input-bordered border-info w-full max-w-xs"
                />
              </div>
              <button
                type="submit"
                className="btn bg-cyan-600 text-white lg:mt-6 ms-5 mx-5"
              >
                <Link
                  href={{
                    pathname: "/doctor/[patientId]",
                    query: {
                      patientId: patientId,
                    },
                  }}
                >
                  <a className="no-underline hover:underline">Access Patient</a>
                </Link>
              </button>
            </form>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar login={true} user={"patient"}></Navbar>
      <div className="flex justify-center  items-start  mt-40 h-screen w-screen ">
        {user?.userRole == "patient" ? showPatient() : showDoctor(showCard)}
      </div>
    </>
  );
};

export default Home;
