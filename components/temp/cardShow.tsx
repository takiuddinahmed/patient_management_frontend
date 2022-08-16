import { loadavg } from "os";
import { useEffect, useState } from "react";
import { fetchApi } from "../../api_calls/axios";
import Button from "../basic/button.component";

const CardShow = () => {
  const [cardId, setCardId] = useState(null);
  const [msg, setMsg] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const deleteData = async () => {
      const data = await fetchApi.delete("/iot");
      console.log(data);
      setLoad(true);
    };
    deleteData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      let timeout: any;
      const res = await fetchApi.get("/iot");
      console.log(res);
      if (res.status == 200 && res?.data?.cardId?.length) {
        const data = res.data;
        if (data.error) {
          setMsg(`No User Found`);
        } else {
          setMsg(`Patient Name: ${data.firstName} ${data.lastName}`);
        }
        setCardId(data.cardId);
      } else {
        timeout = setTimeout(() => {
          getData();
        }, 500);
      }
    };
    if (load) {
      getData();
    }
  }, [load]);

  return (
    <>
      <div className="h-[300px] w-[400px] bg-white shadow-md shadow-gray-600 flex flex-col gap-3 items-center justify-between py-20">
        {cardId ? (
          <div>
            <h1 className="text-center text-2xl">RFID Card Found</h1>
            <h2 className="text-xl mt-4">Card ID : {cardId}</h2>
            <h2 className="text-xl">{msg}</h2>
          </div>
        ) : (
          <h1 className="text-2xl">Please Scan the Card</h1>
        )}
      </div>
    </>
  );
};

export default CardShow;
