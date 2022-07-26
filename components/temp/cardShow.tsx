import { getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { loadavg } from "os";
import { useEffect, useState } from "react";
import { fetchApi } from "../../api_calls/axios";
import Button from "../basic/button.component";
import { iotCollection, iotDoc } from "../firebase";

const CardShow = () => {
  const [cardId, setCardId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    clearData();
  }, []);

  const clearData = async () => {
    await setDoc(iotDoc, {
      cardid: "",
    });
    setCardId(null);
    setReady(true);
  };

  const gotoPrescription = () => {
    router.push("/doctor/" + cardId);
  };

  useEffect(() => {
    const getData = async () => {
      const unsub = onSnapshot(iotDoc, (doc) => {
        console.log("Current Data: ", doc.data());
        const data = doc.data();
        if (data && data?.cardid?.length) setCardId(data.cardid);
      });
    };
    if (ready) getData();
  }, [ready]);

  return (
    <>
      <div className="h-[300px] w-[400px] bg-white shadow-md shadow-gray-600 flex flex-col gap-3 items-center justify-between py-10 my-3">
        {cardId ? (
          <div>
            <div>
              <h1 className="text-center text-2xl">RFID Card Found</h1>
              <h2 className="text-xl mt-4 text-center">Card ID : {cardId}</h2>
              <h2 className="text-xl text-center">{msg}</h2>
            </div>
            <div className="flex gap-3 mt-3">
              <Button onClick={() => gotoPrescription()}>
                Go to Prescripiton
              </Button>
              <Button
                onClick={() => {
                  clearData();
                }}
              >
                Reload
              </Button>
            </div>
          </div>
        ) : (
          <h1 className="text-2xl">Please Scan the Card</h1>
        )}
      </div>
    </>
  );
};

export default CardShow;
