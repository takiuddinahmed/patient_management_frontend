import { Autocomplete, TextField } from '@mui/material';
import { collection, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { initialPrescriptionForm, IPrescriptionForm } from '../../api_calls/doctor/prescription.api';
import { db } from '../../components/firebase';
import Navbar from '../../components/layouts/navbar.component';
import { IUser, users } from '../../interface/user.interface';



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

        if (presData[i]?.patientID == router.query.patientId) {
            datePresData.push(presData[i]?.createdAt.toDate().toString())

        }
        if (presData[i]?.createdAt.toDate().toString() == pastHistory && presData[i]?.patientID == router.query.patientId) {
            patientPresData.push(presData[i])
        }

    }

    let recentPresData = []
    recentPresData = patientPresData[0]



    const [labForm, setLabForm] = useState<any>({})
    const [labData, setLabData] = useState<any>([])
    const updateLabForm = (field: string, value: any) => {
        setLabForm((preValue: any) => ({ ...preValue, [field]: value }))
    }
    let data: any[] = []

    const addLabData = () => {
        data.push(labForm)
        setLabData([...labData, ...data])
        console.log(labData)

    }





    const handleSubmit = () => {


        setPastHistory('')
    }



    return (
        <>
            <Navbar login={true} user={''}></Navbar>





            <div className='flex'>
                <div>
                    <div className='text-2xl px-5 py-3'><span className='mx-3'>Name: {patient?.firstName} {patient?.lastName}</span>  <span className='mx-3'>Age:{patient?.age}</span></div>
                    <div className="ml-5 p-3">
                        <div className="mt-2  text-2xl text-cyan-700">
                            <span>Dr :</span> {recentPresData?.doctorFirstName} {recentPresData?.doctorLastName}
                        </div>
                        <div className="my-2 ">
                            <span className="border-b-2 border-gray-400  my-2 font-semibold">
                                {" "}
                                Prescription List :{" "}
                            </span>
                            <form onSubmit={(e) => { e.preventDefault() }} className='flex flex:row'>
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

                    <div>

                    </div>
                    <div>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>

                            <div className='flex  lg:flex-row items-center'>
                                <div className="form-control  w-full max-w-xs px-3">
                                    <span className="label-text">Test</span>
                                    <div className='flex lg:flex-row  justify-center items-center '>
                                        <input value={labForm.name} onChange={(e) => updateLabForm('name', e.target.value)} type="text" placeholder='Name' className="input input-bordered  mt-1.5 border-info w-full max-w-xs" />

                                    </div>
                                </div>

                                <div className="form-control  w-full max-w-xs px-3">
                                    <span className="label-text">Value</span>
                                    <div className='flex lg:flex-row  justify-center items-center '>
                                        <input value={labForm.value} onChange={(e) => updateLabForm('value', e.target.value)} type="text" placeholder='Value' className="input input-bordered  mt-1.5 border-info w-full max-w-xs" />

                                    </div>
                                </div>
                                <button onClick={addLabData} type='submit' className='btn btn-success text-white mt-7'>ADD</button>
                            </div>
                        </form>
                    </div>


                </div>
                <div className=" w-3/5 mx-auto mt-5 ">

                    <table className="table w-full p-5">

                        <thead>
                            <tr>

                                <th className='text-4xl text-center'>Test Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentPresData?.investigation?.map((inv: string) => (
                                <tr className='text-3xl hover:bg-slate-200' key={inv}>{inv}</tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    );
};

export default Index;