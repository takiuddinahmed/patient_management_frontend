import { Autocomplete, TextField } from "@mui/material";
import { spawn } from "child_process";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  ILabData,
  ILabDataForm,
  initialLabData,
  initialLabDataForm,
  IValues,
} from "../../api_calls/lab/lab.api";
import { db, storage } from "../../components/firebase";
import LabData from "../../components/form/lab.component";
import Navbar from "../../components/layouts/navbar.component";
import { IUser, users } from "../../interface/user.interface";

const Index = () => {
  const [presData, setPresData] = useState<any>([]);
  const [pastHistory, setPastHistory] = useState<any>([]);

  const [labData, setLabData] = useState<ILabData>(initialLabData);

  const router = useRouter();

  const [patient, setPatient] = useState<any>(null);
  useEffect(() => {
    if (router.isReady) {
      const { patientId } = router.query;
      const user = users.filter((u) => u.cardId == patientId);
      if (user.length) {
        setPatient(user[0]);
      } else setPatient(users[0]);

      console.log(users[0]);
    }
  }, [router]);

  const colRef = collection(db, "prescription");
  const q = query(colRef, orderBy("createdAt", "asc"));

  useEffect(() => {
    const getFireStoreData = async () => {
      const prescriptionData = await getDocs(q);

      setPresData(
        prescriptionData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getFireStoreData();
  }, []);

  //  getting the latest DATA of the Patient
  let datePresData = [];
  let patientPresData: any[] = [];

  for (let i = 0; i <= presData.length; i++) {

    let date = presData[i]?.createdAt?.toDate().getDate();
    let month = presData[i]?.createdAt?.toDate().getMonth() + 1;
    let year = presData[i]?.createdAt?.toDate().getFullYear()


    if (presData[i]?.patientID == router.query.patientId) {
      datePresData.push({
        ...presData[i], label: ` ${presData[i]?.doctorFirstName} ${presData[i]?.doctorLastName} - ${date}/${month}/${year}`
      });


    }
    if (
      presData[i]?.createdAt == pastHistory.createdAt &&
      presData[i]?.patientID == router.query.patientId
    ) {
      patientPresData.push(presData[i]);
    }
  }

  let recentPresData: any = [];
  recentPresData = patientPresData[0];



  const addToLab = (data: ILabDataForm) => {
    setLabData((prev) => ({
      ...prev,
      labData: [...prev.labData, data],
    }));
  }



  const patientRef = doc(db, "prescription", `${recentPresData?.id}`);
  const updateReport = () => {
    updateDoc(patientRef, {
      testResults: {
        labData: labData.labData,
      },
    });

    alert("Report Submitted")
    setLabData(initialLabData)
  }






  return (
    <>
      <Navbar login={true} user={""}></Navbar>

      <div className="flex mb-5">
        <div>
          <div className="text-2xl px-5 py-3">
            <span className="mx-3">
              Name: {patient?.firstName} {patient?.lastName}
            </span>{" "}
            <span className="mx-3">Age:{patient?.age}</span>
          </div>
          <div className="ml-5 p-3">
            <div className="mt-2  text-2xl text-cyan-700">
              {recentPresData?.doctorFirstName}{" "}
              {recentPresData?.doctorLastName}
            </div>
            <div className="my-2 ">
              <span className="border-b-2 border-gray-400  my-2 font-semibold">
                {" "}
                Prescription List :{" "}
              </span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="flex flex:row"
              >
                <div className="py-3">
                  <Autocomplete
                    onChange={(e, value) => setPastHistory(value || "")}
                    disablePortal
                    id="combo-box-demo"
                    options={datePresData}
                    getOptionLabel={(option) => option.label}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="" />}
                  />
                </div>
              </form>
            </div>
          </div>

          {
            recentPresData !== undefined &&
            <>

              <div className=" ml-5 p-3 ">
                <span className="border-b-2 border-gray-400  my-2 font-semibold text-xl">
                  {" "}
                  Test Results :{" "}
                </span>
                <div>
                  {labData?.labData?.map((val) => (
                    <>
                      <div className="mt-5">
                        <span className='mx-7 text-lg text-semibold'>
                          Test  Name:  {val.testName}
                        </span>
                        <br />

                        {val.url !== "" && <span className="text-bold  mx-7"> File Attached: {val.fileName}</span>}

                        {val.values.length !== 0 &&
                          <table key={val.testName} className="table w-full mt-4">
                            <thead className="text-center text-lg">

                              <tr>
                                <th className="text-center text-lg">Property</th>
                                <th className="text-center text-lg">Value</th>
                                <th className="text-center text-lg">Normal Value</th>
                              </tr>
                            </thead>

                            <tbody>
                              {
                                val.values.map((prop) => (
                                  <tr className=" hover:bg-slate-200 text-center" key={val.testName}>
                                    <td className=" hover:bg-slate-200">{prop.property} </td>
                                    <td className=" hover:bg-slate-200">{prop.value}</td>
                                    <td className=" hover:bg-slate-200">{prop.normalValue}</td>

                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>}

                      </div>
                    </>
                  ))
                  }
                </div>

              </div>

              <LabData addToLab={addToLab} dataId={recentPresData?.id}></LabData>


            </>


          }

        </div>
        {recentPresData?.investigation &&
          <div className=" w-3/5 ml-44 mt-5 ">
            <span className="border-b-2 border-gray-400  text-3xl font-semibold">
              {" "}
              Investigation :{" "}
            </span>
            <ol className="list-decimal m-3">

              {recentPresData?.investigation?.map((inv: string) => (
                <li key={inv}>
                  <span className="p-2  text-lg">{inv} </span>
                </li>))}

            </ol>
            <div className="mt-44">
              {
                labData !== initialLabData ? (
                  <button onClick={updateReport} className="btn btn-success  text-white">Submit Report</button>) : (<></>)}
            </div>
          </div>
        }


      </div>
    </>
  );
};

export default Index;
