import { Autocomplete, TextField } from '@mui/material';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DoseTime, initialPrescriptionForm, IPrescriptionForm, TimeType } from '../../api_calls/doctor/prescription.api';
import { db } from '../../components/firebase';
import Navbar from '../../components/layouts/navbar.component';
import { IUser, users } from '../../interface/user.interface';



const Index = () => {
    // const [prescriptionForm, setPrescriptionForm] = useState<IPrescriptionForm>(
    //     initialPrescriptionForm);

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

        if (presData[i]?.patientID == router.query.patientId) {
            datePresData.push(presData[i]?.createdAt.toDate().toString())

        }
        if (presData[i]?.createdAt.toDate().toString() == pastHistory && presData[i]?.patientID == router.query.patientId) {
            patientPresData.push(presData[i])
        }

    }

    let recentPresData = []
    recentPresData = patientPresData[0]



    const handleSubmit = () => {


        setPastHistory('')
    }


    return (
        <div>
            <Navbar login={true} user={''}></Navbar>

            <div className='flex '>

                <div>
                    <div className='text-2xl px-5 py-3'><span className='mx-3'>Name: {patient?.firstName} {patient?.lastName}</span>  <span className='mx-3'>Age:{patient?.age}</span></div>
                    <div className="ml-5 p-3">

                        <div className="my-2 ">
                            <span className="border-b-2 border-gray-400  my-2 font-semibold">
                                {" "}
                                Prescription List :{" "}
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
                </div>
                <div className="w-3/5 mx-auto mt-5 ">
                    <table className="table w-full ">

                        <thead>
                            <tr>

                                <th className='text-2xl text-center'>Name</th>
                                <th className='text-2xl text-center'>Dose</th>
                                <th className='text-2xl text-center'>Duration</th>
                            </tr>
                        </thead>
                        <tbody >


                            {recentPresData?.medicine?.map((pres: any) => (

                                <tr className='text-2xl hover:bg-slate-200' key={pres.name} >

                                    <td>{pres.name}</td>
                                    <td>{pres.dose}</td>
                                    <td>{pres.time} {pres.timeType} </td>

                                </tr>


                            ))}



                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Index;