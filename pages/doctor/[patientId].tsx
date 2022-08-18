import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  IMedicine,
  initialPrescriptionForm,
  IObservation,
  IPrescriptionForm,
} from "../../api_calls/doctor/prescription.api";
import { db } from "../../components/firebase";
import AdviceField from "../../components/form/advice.component";
import CcForm from "../../components/form/cc.component";
import DiagnosisForm from "../../components/form/diagnosis.component";
import InvestigationForm from "../../components/form/investigation.component";
import OnExaminationForm from "../../components/form/oe.component";
import RxForm from "../../components/form/rx.component";
import Navbar from "../../components/layouts/navbar.component";
import { IUser, users } from "../../interface/user.interface";
import { getLocalHostData } from "../../utils/getLocalData.util";

const Index = () => {
  const [prescriptionForm, setPrescriptionForm] = useState<IPrescriptionForm>(
    initialPrescriptionForm
  );
  const router = useRouter();
  const [doctor, setDoctor] = useState<IUser | null>({});
  const [patient, setPatient] = useState<any>(null);

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

  useEffect(() => {
    console.log({ prescriptionForm });
  }, [prescriptionForm]);

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
              {" "}
              Past History :{" "}
            </span>
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
        </div>
      </div>
    </>
  );
};

export default Index;
