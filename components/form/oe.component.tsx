import React, { FC, useState } from 'react';
import { initialObservations, IObservation } from '../../api_calls/doctor/prescription.api';
interface IProp {
    addToOnExamination: Function;
}

const OnExaminationForm: FC<IProp> = ({ addToOnExamination }) => {
    const [examinationForm, setExaminationForm] = useState<IObservation>(initialObservations)
    const updateExaminationForm = (field: string, value: any) => {
        setExaminationForm(preValue => ({ ...preValue, [field]: value }))
    }

    const handleSubmit = () => {
        addToOnExamination(examinationForm)
        setExaminationForm(initialObservations)
    }

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>

                <div className='flex  lg:flex-row items-center'>
                    <div className="form-control  w-full max-w-xs px-3">

                        <div className='flex lg:flex-row  justify-center items-center '>
                            <input value={examinationForm.name} onChange={(e) => updateExaminationForm('name', e.target.value)} type="text" placeholder='Name' className="input input-bordered  mt-1.5 border-info w-full max-w-xs" />

                        </div>
                    </div>

                    <div className="form-control  w-full max-w-xs px-3">

                        <div className='flex lg:flex-row  justify-center items-center '>
                            <input value={examinationForm.value} onChange={(e) => updateExaminationForm('value', e.target.value)} type="text" placeholder='Value' className="input input-bordered  mt-1.5 border-info w-full max-w-xs" />

                        </div>
                    </div>
                    <button type='submit' className='btn btn-success text-white mt-2'>ADD</button>
                </div>
            </form>
        </div>
    );
};

export default OnExaminationForm;