import React, { useState } from 'react';
import { IPrescriptionForm } from '../../api_calls/doctor/prescription.api';
import Navbar from '../../components/layouts/navbar.component';


const labMockData: IPrescriptionForm = {
    medicines: [],


    complaints: ['Fever', 'Headache', 'Cold'],
    investigations: [
        "ECG",
        "CT-scan",
        "X-ray",
        "TSH",
        "FT4",
        "FT3",
        "S Calcium",
        "Para Thyroid Hormone",
        "RBS",
        "FBS",
        "OGTT"
    ],
    diagnosis: ['Covid-19', 'Diabetics'],
    observation: [],
    advices: [],

}
const Index = () => {
    const [prescriptionForm, setPrescriptionForm] = useState<IPrescriptionForm>(
        labMockData);
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