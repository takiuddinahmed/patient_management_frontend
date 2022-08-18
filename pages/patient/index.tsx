import React, { useState } from 'react';
import { initialPrescriptionForm, IPrescriptionForm } from '../../api_calls/doctor/prescription.api';
import Navbar from '../../components/layouts/navbar.component';

const Index = () => {
    const [prescriptionForm, setPrescriptionForm] = useState<IPrescriptionForm>(
        initialPrescriptionForm
    );

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-3 gap-4">
                <div className="ml-5">
                    <div className="my-2">
                        <span className="border-b-2 border-gray-400 font-semibold">
                            {" "}
                            Chief Complaints :{" "}
                        </span>
                        <ul className="list-disc m-3">
                            {prescriptionForm.complaints.map((complain) => (
                                <li key={complain}>
                                    {complain}
                                </li>
                            ))}

                        </ul>

                    </div>
                    <div className="my-2">
                        <span className="border-b-2 border-gray-400  font-semibold">
                            {" "}
                            Past History :{" "}
                        </span>
                        <ul className="list-decimal m-3">

                        </ul>

                    </div>
                    <div className="my-2">
                        <span className="border-b-2 border-gray-400  font-semibold">
                            On Examination:{" "}
                        </span>
                        <ul className="list-disc m-3">
                            {prescriptionForm.observation.map((obs) => (
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
                            {prescriptionForm.investigations.map((inv) => (

                                <li key={inv}>{inv}</li>
                            ))}
                        </ul>

                    </div>
                    <div className="my-2">
                        <span className="border-b-2 border-gray-400  font-semibold">
                            {" "}
                            Diagnosis :{" "}
                        </span>
                        <ul className="list-disc m-3">
                            {prescriptionForm.diagnosis.map((dia) => (

                                <li key={dia}>{dia}</li>
                            ))}
                        </ul>

                    </div>
                </div>

                <div className="mr-5 col-span-2 border-l-2 border-cyan-600 h-screen">
                    <div className="flex  justify-around text-lg py-2 border-b-2 border-cyan-600">
                        <span>Name: </span>
                        <span>Age: </span>
                        <span>Sex: </span>
                    </div>
                    <div>
                        <div className="p-3">
                            <span className="border-b-2 border-gray-400  font-semibold">
                                {" "}
                                RX :{" "}
                            </span>
                            <ol className="list-decimal m-3">
                                {prescriptionForm.medicines.map((pres) => (
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

                        <div>

                        </div>
                    </div>
                    <div className="mt-10 p-3">
                        <span className="border-b-2 border-gray-400  font-semibold">
                            {" "}
                            Advices :{" "}
                        </span>
                        <ul className="list-disc m-3">

                            {prescriptionForm.advices.map((adv) => (

                                <li key={adv}>{adv}</li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;