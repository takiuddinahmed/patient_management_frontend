// import { Connector, useMqttState } from "mqtt-react-hooks";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../components/basic/button.component";
import Navbar from "../components/layouts/navbar.component";

const Home: NextPage = () => {
  const [rfid, setRfid] = useState<string>("");
  const [read, setRead] = useState<number>(0);

  useEffect(() => {
    const fetchData = async (writeNull: boolean) => {
      const res = await fetch("http://68.183.186.8:3500/iot");
      if (res && res.ok) {
        const data = await res.json();
        console.log(data?.message);
        if (data && data?.message?.length) {
          setRfid(data.message);
        } else {
          if (writeNull) {
            setRfid("");
          }
        }
      }
    };
    fetchData(true);
    const interval = setInterval(() => {
      fetchData(false);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [read]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-start  mt-40 h-screen w-screen ">
        <div className="h-[300px] w-[300px] bg-white shadow-md shadow-gray-600 flex flex-col gap-3 items-center justify-between py-20">
          {rfid ? (
            <div>
              <h1 className="text-center text-2xl">RFID Card Found</h1>
              <h2 className="text-xl">ID : {rfid}</h2>
            </div>
          ) : (
            <h1 className="text-2xl">Card Not Found</h1>
          )}
          <Button
            onClick={() => {
              setRead((value) => value + 1);
            }}
          >
            Reload
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
