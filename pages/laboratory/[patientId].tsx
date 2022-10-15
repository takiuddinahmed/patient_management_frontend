import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { initialPrescriptionForm, IPrescriptionForm } from '../../api_calls/doctor/prescription.api';
import Navbar from '../../components/layouts/navbar.component';
import { IUser, users } from '../../interface/user.interface';



const Index = () => {
    const [prescriptionForm, setPrescriptionForm] = useState<IPrescriptionForm>(
        initialPrescriptionForm);

    const router = useRouter();
    const [doctor, setDoctor] = useState<IUser | null>({});
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

    return (
        <>
            <Navbar login={true} user={''}></Navbar>





            <div className="overflow-x-auto w-3/5 mx-auto mt-5 ">
                <table className="table w-full p-5">

                    <thead>
                        <tr>

                            <th className='text-4xl text-center'>Test Name</th>
                        </tr>
                    </thead>
                    <tbody >

                        <tr className="hover ">

                            {prescriptionForm.investigations.map((inv) => (
                                <li className='text-2xl hover:bg-slate-200 px-4 py-2' key={inv}>  {inv}</li>
                            ))}

                        </tr>


                    </tbody>
                </table>
            </div>


        </>
    );
};

export default Index;