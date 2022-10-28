import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  DoseTime,
  initialPrescriptionForm,
  IPrescriptionForm,
  TimeType,
} from "../../api_calls/doctor/prescription.api";
import { db } from "../../components/firebase";
import Navbar from "../../components/layouts/navbar.component";
import { IUser, users } from "../../interface/user.interface";

const Index = () => {
  // const [prescriptionForm, setPrescriptionForm] = useState<IPrescriptionForm>(
  //     initialPrescriptionForm
  // );

  const [presData, setPresData] = useState<any>([]);

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
  let A = [];
  for (let i = 0; i <= presData.length; i++) {
    if (presData[i]?.patientID == router.query.patientId) {
      A.push(presData[i]);
    }
  }
  let recentPresData = [];
  recentPresData = A[A.length - 1];

  return (
    <>
      <Navbar login={true} user={""}></Navbar>
      <div className="grid grid-cols-3 gap-4">
        <div className="ml-5">
          <div className="mt-2  text-2xl text-cyan-700">

            {recentPresData?.doctorFirstName} {recentPresData?.doctorLastName}
          </div>

          <div className="my-2">
            <span className="border-b-2 border-gray-400 font-semibold">
              {" "}
              Chief Complaints :{" "}
            </span>
            <ul className="list-disc m-3">
              {recentPresData?.complaints?.map((complain: any) => (
                <li key={complain}>{complain}</li>
              ))}
            </ul>
          </div>
          <div className="my-2">
            <span className="border-b-2 border-gray-400  font-semibold">
              Past Reports:{" "}
            </span>{" "}
            <br /> <br />
            <Link
              href={{
                pathname: "/patient/pastreports/[patientId]",
                query: {
                  patientId: router.query.patientId,
                },
              }}
            >
              <a className="no-underline hover:underline">Past Reports</a>
            </Link> <br />
            <Link href={{
              pathname: "/patient/reportlists/[patientId]",
              query: {
                patientId: router.query.patientId
              }
            }}>
              <a className="no-underline hover:underline">
                Reports Lists
              </a>
            </Link>
          </div>
          <div className="my-2">
            <span className="border-b-2 border-gray-400  font-semibold">
              On Examination:{" "}
            </span>
            <ul className="list-disc m-3">
              {recentPresData?.observation?.map((obs: any) => (
                <li key={obs.name}>
                  <span className="p-2 text-lg">
                    {obs.name}: {obs.value}{" "}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="my-2">
            <span className="border-b-2 border-gray-400  font-semibold">
              {" "}
              Investigation :{" "}
            </span>
            <ul className="list-disc m-3">
              {recentPresData?.investigation?.map((inv: any) => (
                <li key={inv}>{inv}</li>
              ))}
            </ul>
          </div>
          <div className="my-2">
            <span className="border-b-2 border-gray-400  font-semibold">
              {" "}
              Differential Diagnosis :{" "}
            </span>
            <ul className="list-disc m-3">
              {recentPresData?.differential?.map((dif: any) => (
                <li key={dif}>
                  <span className="p-2 text-lg">{dif} </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="my-2">
            <span className="border-b-2 border-gray-400  font-semibold">
              {" "}
              Diagnosis :{" "}
            </span>
            <ul className="list-disc m-3">
              {recentPresData?.diagnosis?.map((dia: any) => (
                <li key={dia}>{dia}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mr-5 col-span-2 border-l-2 border-cyan-600 h-fit">
          <div className="flex  justify-around text-lg py-2 border-b-2 border-cyan-600">
            <span>
              Name: {patient?.firstName} {patient?.lastName}{" "}
            </span>
            <span>Age:{patient?.age} </span>
            <span>Sex:{patient?.sex} </span>
          </div>
          <div>
            <div className="p-3">
              <span className="border-b-2 border-gray-400  font-semibold">
                {" "}
                RX :{" "}
              </span>
              <ol className="list-decimal m-3">
                {recentPresData?.medicine?.map((pres: any) => (
                  <li key={pres.name}>
                    <span className="p-2 text-lg">{pres.name} </span> <br />
                    <span className="p-2"> {pres.dose} </span>
                    <span className="p-2">{pres.doseTime}</span>
                    <span className="p-2">
                      {pres.time} {pres.timeType}{" "}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div></div>
          </div>
          <div className="mt-10 p-3">
            <span className="border-b-2 border-gray-400  font-semibold">
              {" "}
              Advices :{" "}
            </span>
            <ul className="list-disc m-3">
              {recentPresData?.advices?.map((adv: any) => (
                <li key={adv}>{adv}</li>
              ))}
            </ul>
          </div>
          {recentPresData?.testResults?.labData &&
            <div className="mt-10 mx-3 col-start-1 col-end-7">
              <span className="border-b-2 border-gray-400  font-semibold">
                Test Results:{" "}
              </span>


              <div>
                {recentPresData?.testResults?.labData?.map((val: any) => (
                  <>
                    <div className="mt-3">


                      {val.values.length !== 0 &&

                        <>
                          <span className='mx-7 my-3 text-xl text-bold'>
                            Test  Name:  {val.testName}
                          </span>
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
                                val.values.map((prop: any) => (
                                  <tr className=" hover:bg-slate-200 text-center" key={val.testName}>
                                    <td className=" hover:bg-slate-200">{prop.property} </td>
                                    <td className=" hover:bg-slate-200">{prop.value}</td>
                                    <td className=" hover:bg-slate-200">{prop.normalValue}</td>

                                  </tr>
                                ))
                              }
                            </tbody>
                          </table> </>}

                    </div>

                  </>
                ))
                }
              </div>
              {recentPresData?.testResults?.labData?.map((val: any) => (
                <>

                  {
                    val.url !== "" &&
                    <div className='my-5 mx-44'>
                      <span className='mx-7 my-3 text-xl text-bold'>
                        Test  Name:  {val.testName}
                      </span>
                      <img style={{ height: '700px', width: '500px' }} src={val.url} alt="" />

                    </div>

                  }
                </>

              ))}
            </div>

          }

        </div>
      </div>
    </>
  );
};

export default Index;
