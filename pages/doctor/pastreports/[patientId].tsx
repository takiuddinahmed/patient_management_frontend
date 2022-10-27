import { Autocomplete, TextField } from '@mui/material';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DoseTime, initialPrescriptionForm, IPrescriptionForm, TimeType } from '../../../api_calls/doctor/prescription.api';
import { db } from '../../../components/firebase';
import Navbar from '../../../components/layouts/navbar.component';
import { IUser, users } from '../../../interface/user.interface';




const Index = () => {


    const [presData, setPresData] = useState<any>([])
    const [pastHistory, setPastHistory] = useState<any>([])


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
    const q = query(colRef, orderBy("createdAt", "asc"))



    useEffect(() => {
        const getFireStoreData = async () => {
            const prescriptionData = await getDocs(q);

            setPresData(prescriptionData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }


        getFireStoreData()



    }, []);




    //  getting the latest DATA of the Patient
    let datePresData = []
    let patientPresData: any[] = []




    for (let i = 0; i <= presData.length; i++) {
        let date = presData[i]?.createdAt?.toDate().getDate();
        let month = presData[i]?.createdAt?.toDate().getMonth() + 1;
        let year = presData[i]?.createdAt?.toDate().getFullYear()

        if (presData[i]?.patientID == router.query.patientId) {
            datePresData.push({
                ...presData[i], label: `${date}/${month}/${year} - ${presData[i]?.doctorFirstName} ${presData[i]?.doctorLastName}`
            });

        }
        if (presData[i]?.createdAt.toDate().toString() == pastHistory.createdAt && presData[i]?.patientID == router.query.patientId) {
            patientPresData.push(presData[i])
        }

    }

    let recentPresData = []
    recentPresData = patientPresData[0]






    const handleSubmit = () => {


        setPastHistory('')
    }


    return (
        <>
            <Navbar login={true} user={''}></Navbar>
            <div className="grid grid-cols-3 ">

                <div className="ml-5 p-3">
                    <div className="mt-2  text-2xl text-cyan-700">
                        <span>Dr :</span>{recentPresData?.doctorFirstName} {recentPresData?.doctorLastName}
                    </div>

                    <div className="my-2 ">
                        <span className="border-b-2 border-gray-400  my-2 font-semibold">
                            {" "}
                            Past History :{" "}
                        </span>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className='flex flex:row'>
                            <div className='py-3'>
                                <Autocomplete

                                    onChange={(e, value) => setPastHistory(value || "")}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={datePresData}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField  {...params} label=""


                                    />}
                                />
                            </div>

                        </form>

                    </div>
                </div>

                <div className="mr-5 col-span-2 border-l-2 border-cyan-600 h-fit">
                    <div className='ml-2'>
                        <div className="flex  justify-around text-lg py-2 border-b-2 border-cyan-600">
                            <span>Name: {patient?.firstName} {patient?.lastName} </span>
                            <span>Age:{patient?.age} </span>
                            <span>Sex:{patient?.sex} </span>
                        </div>
                        <div className='grid grid-cols-3 p-3'>
                            <div>
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
                            <div className="my-2">
                                <span className="border-b-2 border-gray-400 font-semibold">
                                    {" "}
                                    Chief Complaints :{" "}
                                </span>
                                <ul className="list-disc m-3">
                                    {recentPresData?.complaints?.map((complain: any) => (
                                        <li key={complain}>
                                            {complain}
                                        </li>
                                    ))}

                                </ul>

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
                            <div className="mt-10">
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

                            <div className="mt-10">
                                <span className="border-b-2 border-gray-400  font-semibold">
                                    Test Results:{" "}
                                </span>
                                <table className="table  p-5 mt-3">

                                    <thead>
                                        <tr>
                                            <th className='text-bold text-center'>Test Name</th>
                                            <th className='text-bold text-center'>Value</th>
                                            <th className='text-bold text-center'>Normal Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {recentPresData?.testResults?.labData.map((obs: any) => (
                                            <tr key={obs.testName}>


                                                <td className='hover:bg-slate-200'> {obs.testName}</td>
                                                <td className='hover:bg-slate-200'>  {obs.value}{" "}</td>
                                                <td className='hover:bg-slate-200'>  {obs.normalValue}{" "}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>

                        </div>

                    </div>

                    <div className='m-20'>
                        <img style={{ height: " 500px", width: "auto" }} src={recentPresData?.testResults?.url} />
                    </div>
                </div>

            </div>


        </>
    );
};

export default Index;