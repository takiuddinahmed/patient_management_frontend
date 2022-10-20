import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  IMedicine,
  initialPrescriptionForm,
  IObservation,
  IPrescriptionForm,
} from "../../api_calls/doctor/prescription.api";
import { auth, db } from "../../components/firebase";
import AdviceField from "../../components/form/advice.component";
import CcForm from "../../components/form/cc.component";
import DifferentialForm from "../../components/form/differential.component";
import DiagnosisForm from "../../components/form/diagnosis.component";
import InvestigationForm from "../../components/form/investigation.component";
import OnExaminationForm from "../../components/form/oe.component";
import RxForm from "../../components/form/rx.component";
import Navbar from "../../components/layouts/navbar.component";
import { IUser, users } from "../../interface/user.interface";
import { getLocalHostData } from "../../utils/getLocalData.util";
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Index = () => {
  const [prescriptionForm, setPrescriptionForm] = useState<IPrescriptionForm>(
    initialPrescriptionForm
  );
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [doctorData, setDoctorData] = useState<any>([])


  const addToMedicine = (medicine: IMedicine) => {
    setPrescriptionForm((prev) => ({
      ...prev,
      medicines: [...prev.medicines, medicine],
    }));
  };
  const addToComplaint = (complaint: string) => {
    setPrescriptionForm((prev) => ({
      ...prev,
      complaints: [...prev.complaints, complaint],
    }));
  };
  const addToOnExamination = (examination: IObservation) => {
    setPrescriptionForm((prev) => ({
      ...prev,
      observation: [...prev.observation, examination],
    }));
  };
  const addToInvestigation = (investigation: string) => {
    setPrescriptionForm((prev) => ({
      ...prev,
      investigations: [...prev.investigations, investigation],
    }));
  };

  const addToDiagnosis = (diagnosis: string) => {
    setPrescriptionForm((prev) => ({
      ...prev,
      diagnosis: [...prev.diagnosis, diagnosis],
    }));
  };

  const addToAdvice = (advice: string) => {
    setPrescriptionForm((prev) => ({
      ...prev,
      advices: [...prev.advices, advice],
    }));
  };
  const addToDifferentialForm = (differential: string) => {
    setPrescriptionForm((prev) => ({
      ...prev,
      differential: [...prev.differential, differential],
    }));
  };



  const user = auth.currentUser;
  let doctor: any[] = [];
  if (user) {



    for (let i = 0; i <= doctorData.length; i++) {

      if (doctorData[i]?.uid === user.uid) {

        doctor.push(doctorData[i])


      }

    }
  }


  const colRef = collection(db, "prescription")
  const colRefDoc = collection(db, "users")

  useEffect(() => {
    const getFireStoreData = async () => {
      const prescriptionData = await getDocs(colRefDoc);

      setDoctorData(prescriptionData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }


    getFireStoreData()

  }, []);






  console.log(doctor[0])



  const handleSubmit = async (prescriptionForm: IPrescriptionForm, patientId: string | string[] | undefined, doctor: { firstName: string; lastName: string; }) => {



    await addDoc(colRef, {
      advices: prescriptionForm.advices,
      complaints: prescriptionForm.complaints,
      diagnosis: prescriptionForm.diagnosis,
      differential: prescriptionForm.differential,
      investigation: prescriptionForm.investigations,
      medicine: prescriptionForm.medicines,
      observation: prescriptionForm.observation,
      patientID: patientId,
      createdAt: serverTimestamp(),
      doctorFirstName: doctor.firstName,
      doctorLastName: doctor.lastName,


    })


  }


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
      <Navbar login={true} user={patient}></Navbar>
      <div className="grid grid-cols-3 gap-4">
        <div className="ml-5">
          <div className="my-2">
            <span className="border-b-2 border-gray-400 font-semibold">
              {" "}
              Chief Complaints :{" "}
            </span>
            <ul className="list-disc m-3">
              {prescriptionForm.complaints.map((complaint) => (
                <li key={complaint}>
                  <span className="p-2 text-lg">{complaint} </span>
                </li>
              ))}
            </ul>
            <CcForm addToComplaint={addToComplaint} />
          </div>
          <div className="my-2">
            <span className="border-b-2 border-gray-400  font-semibold">
              Past Reports:{" "}
            </span> <br /> <br />
            <Link href={{
              pathname: "/doctor/pastreports/[patientId]",
              query: {
                patientId: router.query.patientId
              }
            }}>
              <a className="no-underline hover:underline">
                Past Reports
              </a>
            </Link>
          </div>

          <div className="my-2">
            <span className="border-b-2 border-gray-400  font-semibold">
              On Examination:{" "}
            </span>
            <ul className="list-disc m-3">
              {prescriptionForm.observation.map((obs) => (
                <li key={obs.name}>
                  <span className="p-2 text-lg">
                    {obs.name}:{obs.value}{" "}
                  </span>
                </li>
              ))}
            </ul>
            <OnExaminationForm
              addToOnExamination={addToOnExamination}
            ></OnExaminationForm>
          </div>
          <div className="my-2">
            <span className="border-b-2 border-gray-400  font-semibold">
              {" "}
              Investigation :{" "}
            </span>
            <ul className="list-disc m-3">
              {prescriptionForm.investigations.map((invst) => (
                <li key={invst}>
                  <span className="p-2 text-lg">{invst} </span>
                </li>
              ))}
            </ul>
            <InvestigationForm addToInvestigation={addToInvestigation} />
          </div>
          <div className="my-2">
            <span className="border-b-2 border-gray-400  font-semibold">
              {" "}
              Differential Diagnosis :{" "}
            </span>
            <ul className="list-disc m-3">
              {prescriptionForm.differential.map((dif) => (
                <li key={dif}>
                  <span className="p-2 text-lg">{dif} </span>
                </li>
              ))}
            </ul>
            <DifferentialForm addToDifferentialForm={addToDifferentialForm} />

          </div>
          <div className="my-2">
            <span className="border-b-2 border-gray-400  font-semibold">
              {" "}
              Diagnosis :{" "}
            </span>
            <ul className="list-disc m-3">
              {prescriptionForm.diagnosis.map((dia) => (
                <li key={dia}>
                  <span className="p-2 text-lg">{dia} </span>
                </li>
              ))}
            </ul>

            <DiagnosisForm addToDiagnosis={addToDiagnosis} />
          </div>
        </div>

        <div className="mr-5 col-span-2 border-l-2 border-cyan-600 h-screen">
          <div className="flex  justify-around text-lg py-2 border-b-2 border-cyan-600">
            <span>Name: {patient?.firstName + " " + patient?.lastName}</span>
            <span>Age: {patient?.age}</span>
            <span>Sex: {patient?.sex}</span>
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
              <RxForm addToMedicine={addToMedicine} />
            </div>
          </div>
          <div className="mt-10 p-3">
            <span className="border-b-2 border-gray-400  font-semibold">
              {" "}
              Advices :{" "}
            </span>
            <ul className="list-disc m-3">
              {prescriptionForm.advices.map((adv) => (
                <li key={adv}>
                  <span className="p-2 text-lg">{adv} </span>
                </li>
              ))}
            </ul>
            <AdviceField addToAdvice={addToAdvice} />
          </div>
          <button onClick={() => { handleSubmit(prescriptionForm, router.query.patientId, doctor[0]) }} type='submit' className='btn text-white btn-success px-10 mx-3'>Submit</button>
        </div>
      </div>
    </>
  );
};

export default Index;
