import React, { FC, useState } from 'react';
import { ILabDataForm, initialLabDataForm } from '../../api_calls/lab/lab.api';
interface IProp {
    addToLab: Function;
}

const LabData: FC<IProp> = ({ addToLab }) => {
    const [labDataForm, setLabDataForm] = useState<ILabDataForm>(initialLabDataForm)
    const updateLabDataForm = (field: string, value: any) => {
        setLabDataForm(preValue => ({ ...preValue, [field]: value }))
    }

    const handleSubmit = () => {
        addToLab(labDataForm)
        setLabDataForm(initialLabDataForm)
    }

    return (
        <div className='w-3/4 -ml-2'>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>

                <div className='flex  lg:flex-row items-center'>
                    <div className="form-control  w-full max-w-xs px-3">

                        <div className='flex lg:flex-row  justify-center items-center '>
                            <input value={labDataForm.testName} onChange={(e) => updateLabDataForm('testName', e.target.value)} type="text" placeholder='Name' className="input input-bordered  mt-1.5 border-info w-full max-w-xs" />

                        </div>
                    </div>

                    <div className="form-control  w-full max-w-xs px-3">

                        <div className='flex lg:flex-row  justify-center items-center '>
                            <input value={labDataForm.value} onChange={(e) => updateLabDataForm('value', e.target.value)} type="text" placeholder='Value' className="input input-bordered  mt-1.5 border-info w-full max-w-xs" />

                        </div>
                    </div>
                    <div className="form-control  w-full max-w-xs px-3">

                        <div className='flex lg:flex-row  justify-center items-center '>
                            <input value={labDataForm.normalValue} onChange={(e) => updateLabDataForm('normalValue', e.target.value)} type="text" placeholder='Normal value' className="input input-bordered  mt-1.5 border-info w-full max-w-xs" />

                        </div>
                    </div>
                    <button type='submit' className='btn btn-success text-white mt-2'>ADD</button>
                </div>
            </form>
        </div>
    );
};

export default LabData;