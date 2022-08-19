import React, { useState } from 'react';
import { DoseTime, IPrescriptionForm, TimeType } from '../../api_calls/doctor/prescription.api';
import Navbar from '../../components/layouts/navbar.component';


const pharmacyMockData: IPrescriptionForm = {
    medicines: [

        {
            name: "Tab.Napa",
            dose: "1+0+1",
            doseTime: DoseTime.AM,
            time: 5,
            timeType: TimeType.days,
        },
        {
            name: "Tab.Alactrol",
            dose: "1+1+1",
            doseTime: DoseTime.AM,
            time: 5,
            timeType: TimeType.days,
        },
        {
            name: "Inj.Maxsuline",
            dose: "1+0+1",
            doseTime: DoseTime.BM,
            time: 5,
            timeType: TimeType.month,
        }



    ],
    complaints: [],
    investigations: [],
    diagnosis: [],
    observation: [],
    advices: [],

}
const Index = () => {
    const [prescriptionForm, setPrescriptionForm] = useState<IPrescriptionForm>(
        pharmacyMockData);
    return (
        <div>
            <Navbar />

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