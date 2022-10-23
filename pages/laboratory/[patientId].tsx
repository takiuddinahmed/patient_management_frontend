import { Autocomplete, TextField } from '@mui/material';
import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ILabData, ILabDataForm, initialLabData } from '../../api_calls/lab/lab.api';
import { db, storage } from '../../components/firebase';
import LabData from '../../components/form/lab.component';
import Navbar from '../../components/layouts/navbar.component';
import { IUser, users } from '../../interface/user.interface';



const Index = () => {

    const [presData, setPresData] = useState<any>([])
    const [pastHistory, setPastHistory] = useState<any>([])

    const [labData, setLabData] = useState<ILabData>(initialLabData)



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

    let recentPresData: any = []
    recentPresData = patientPresData[0]
    console.log(recentPresData)

    const addToLab = (data: ILabDataForm) => {
        setLabData((prev) => ({
            ...prev,
            labData: [...prev.labData, data],
        }));
    };

    // file uploading and getting img url
    const formHandler = (e: any) => {
        e.preventDefault();
        const file = e.target[0].files[0];

        if (recentPresData == undefined) {
            alert('please select a prescription')
        }
        else {
            uploadFiles(file);
        }

    };


    const patientRef = doc(db, "prescription", `${recentPresData?.id}`)
    const uploadFiles = (file: any) => {
        if (!file) return;

        const sotrageRef = ref(storage, `files`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

        uploadTask.on(
            "state_changed",


            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    // console.log("File available at", downloadURL);
                    // updating data
                    updateDoc(patientRef, {
                        testResults:
                        {
                            labData: labData.labData,
                            url: downloadURL
                        }


                    })
                });
            }
        );
    };















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
                    <div className="my-2 ml-8">
                        <span className="border-b-2 border-gray-400  font-semibold">
                            Test Results:{" "}
                        </span>
                        <table className="table w-3/4 p-5 mt-3">

                            <thead>
                                <tr>
                                    <th className='text-bold text-center'>Test Name</th>
                                    <th className='text-bold text-center'>Value</th>
                                    <th className='text-bold text-center'>Normal Value</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {labData.labData.map((obs) => (
                                    <tr key={obs.testName}>


                                        <td className='hover:bg-slate-200'> {obs.testName}</td>
                                        <td className='hover:bg-slate-200'>  {obs.value}{" "}</td>
                                        <td className='hover:bg-slate-200'>  {obs.normalValue}{" "}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <LabData addToLab={addToLab}></LabData>
                    </div>
                    <div className="mt-7 ml-8">
                        <form onSubmit={formHandler} >
                            <input className='bg-slate-200 border rounded-lg w-50 p-2' type="file" accept="image/* , .pdf" />
                            <button type="submit" className='btn btn-primary text-white ml-2.5'>Upload File</button>


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