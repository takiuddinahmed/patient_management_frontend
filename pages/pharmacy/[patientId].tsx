import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DoseTime, initialPrescriptionForm, IPrescriptionForm, TimeType } from '../../api_calls/doctor/prescription.api';
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
        <div>
            <Navbar login={true} user={''}></Navbar>

            <div>

                <div className="overflow-x-auto w-3/5 mx-auto mt-5 ">
                    <table className="table w-full ">

                        <thead>
                            <tr>

                                <th className='text-2xl text-center'>Name</th>
                                <th className='text-2xl text-center'>Dose</th>
                                <th className='text-2xl text-center'>Duration</th>
                            </tr>
                        </thead>
                        <tbody >


                            {prescriptionForm.medicines.map((pres) => (

                                <tr className='text-2xl hover' key={pres.name} >

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