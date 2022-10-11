export enum DoseTime {
  AM = "A.M",
  BM = "B.M",
}

export enum TimeType {
  days = "days",
  week = "week",
  month = "month",
}

export interface IMedicine {
  name: string;
  dose: string;
  doseTime: DoseTime;
  time: number;
  timeType: TimeType;
}
export interface IObservation {
  name: string;
  value: string | number;
}

export interface IPrescriptionForm {
  medicines: IMedicine[];
  complaints: string[];
  investigations: string[];
  diagnosis: string[];
  observation: IObservation[];
  advices: string[];
  derivative: string[];
}

export const initialPrescriptionForm = {
  medicines: [],
  complaints: [],
  investigations: [],
  derivative: [],
  diagnosis: [],
  observation: [],
  advices: [],
};

export const initialMedicine: IMedicine = {
  name: "",
  dose: "",
  doseTime: DoseTime.AM,
  time: 0,
  timeType: TimeType.days,
};
export const initialObservations: IObservation = {
  name: "",
  value: "",
};
