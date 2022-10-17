import React, { FC, useState } from "react";
import {
  DoseTime,
  IMedicine,
  initialMedicine,
  TimeType,
} from "../../api_calls/doctor/prescription.api";

interface IProp {
  addToMedicine: Function;
}

const RxForm: FC<IProp> = ({ addToMedicine }) => {
  const [medicineForm, setMedicineForm] = useState<IMedicine>(initialMedicine);

  const updateMedicineForm = (field: string, value: any) => {
    setMedicineForm((preValue) => ({ ...preValue, [field]: value }));
  };

  const handleSubmit = () => {
    console.log(medicineForm);
    addToMedicine(medicineForm);
    setMedicineForm(initialMedicine);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="form-control w-full max-w-xs px-3">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              value={medicineForm.name}
              onChange={(e) => updateMedicineForm("name", e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered border-info w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs px-3 ">
            <label className="label">
              <span className="label-text">Dose</span>
            </label>
            <input
              value={medicineForm.dose}
              onChange={(e) => updateMedicineForm("dose", e.target.value)}
              type="text"
              className="input input-bordered  border-info w-full max-w-xs"
            />
          </div>
          <div className="mt-2 flex flex-col w-full px-3">
            <label className="label-text ">Consumption Time</label>
            <select
              value={medicineForm.doseTime}
              onChange={(e) => updateMedicineForm("doseTime", e.target.value)}
              className="select select-bordered border-info w-full mt-1.5 max-w-xs"
            >
              <option value={DoseTime.AM}>A.M</option>
              <option value={DoseTime.BM}>B.M</option>
            </select>
          </div>
          <div className="form-control  w-full max-w-xs px-3">
            <label className="label-text">Consumption Period</label>
            <div className="flex lg:flex-row  justify-center items-center ">
              <input
                value={medicineForm.time}
                onChange={(e) => updateMedicineForm("time", e.target.value)}
                type="number"
                min={0}
                className="input input-bordered  mt-1.5 border-info w-full max-w-xs"
              />
            </div>
          </div>
          <div className="form-control mt-5  w-full max-w-xs px-3">
            <select
              value={medicineForm.timeType}
              onChange={(e) => updateMedicineForm("timeType", e.target.value)}
              className="select select-bordered border-info w-full max-w-xs mt-1.5"
            >
              <option value={TimeType.days}>Days</option>
              <option value={TimeType.week}>Weeks</option>
              <option value={TimeType.month}>Months</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-success text-white lg:mt-6 px-10 mx-3"
            >
              ADD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RxForm;
