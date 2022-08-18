import React, { useState } from 'react';
import { IMedicine } from '../../api_calls/doctor/prescription.api';
import Navbar from '../../components/layouts/navbar.component';

const Index = () => {
    const [complaints, setComplaints] = useState<string[]>(['Headache', 'fever'])
    const [pastHistory, setPastHistory] = useState<string[]>(['Headache', 'fever'])
    const [observations, setObservation] = useState<any[]>([{ name: 'bp', value: 90 }])
    const [investigations, setInvestigation] = useState<string[]>(['ECG', 'CT-scan', 'X-ray'])
    const [diagnosis, setDiagnosis] = useState<string[]>(['ECG', 'CT-scan', 'X-ray'])
    const [medicines, setMedicines] = useState<any[]>([{ name: 'Tab.Napa', dose: '1+0+1', doseTime: "A.M", time: 5, timeType: "days" }])
    const [advices, setAdvices] = useState<string[]>(['rest', 'no heavy lifting', 'walk 30 mints a day'])
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
                            {complaints.map((complain) => (
                                <li>
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
                            {pastHistory.map((ph) => (
                                <li>
                                    {ph}
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className="my-2">
                        <span className="border-b-2 border-gray-400  font-semibold">
                            On Examination:{" "}
                        </span>
                        <ul className="list-disc m-3">
                            {observations.map((obs) => (
                                <li>
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
                            {investigations.map((inv) => (

                                <li>{inv}</li>
                            ))}
                        </ul>

                    </div>
                    <div className="my-2">
                        <span className="border-b-2 border-gray-400  font-semibold">
                            {" "}
                            Diagnosis :{" "}
                        </span>
                        <ul className="list-disc m-3">
                            {diagnosis.map((dia) => (

                                <li>{dia}</li>
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
                                {medicines.map((pres) => (
                                    <li>
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

                            {advices.map((adv) => (

                                <li>{adv}</li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;