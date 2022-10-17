import { collection, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { initialPrescriptionForm, IPrescriptionForm } from '../../api_calls/doctor/prescription.api';
import { db } from '../../components/firebase';
import Navbar from '../../components/layouts/navbar.component';
import { IUser, users } from '../../interface/user.interface';



const Index = () => {
    // const [prescriptionForm, setPrescriptionForm] = useState<IPrescriptionForm>(
    //     initialPrescriptionForm);

    const [presData, setPresData] = useState<any>([])


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
    let A = []
    for (let i = 0; i <= presData.length; i++) {
        if (presData[i]?.patientID == router.query.patientId) {
            A.push(presData[i])
        }
    }
    let recentPresData = []
    recentPresData = A[A.length - 1]




    return (
        <>
            <Navbar login={true} user={''}></Navbar>


            <div className='text-2xl px-5 py-3'><span className='mx-3'>Name: {patient?.firstName} {patient?.lastName}</span>  <span className='mx-3'>Age:{patient?.age}</span></div>


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


        </>
    );
};

export default Index;