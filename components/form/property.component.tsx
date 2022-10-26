import React, { FC, useState } from 'react';
import { initialValues, IValues } from '../../api_calls/lab/lab.api';


interface IProp {
    addToLabForm: Function;
}
const LabFormValues: FC<IProp> = ({ addToLabForm }) => {
    const [labValues, setLabValues] = useState<IValues>(initialValues)

    const updateLabValues = (field: string, value: any) => {
        setLabValues((preValue) => ({ ...preValue, [field]: value }))
    }

    const handleSubmit = () => {

        addToLabForm(labValues)
        setLabValues(initialValues)
    }
    return (
        <form
            className='w-96 ml-8 mt-4'
            onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>

            <div className='flex  lg:flex-row items-center'>
                <div className="form-control  w-3/4 pr-1">

                    <div className='flex lg:flex-row  justify-center items-center '>
                        <input
                            style={{ height: '40px' }}
                            value={labValues.property} onChange={(e) => updateLabValues('property', e.target.value)} type="text" placeholder='Name' className="input input-bordered  mt-1.5 border-info w-full max-w-xs" />

                    </div>
                </div>

                <div className="form-control  w-3/4  px-1">

                    <div className='flex lg:flex-row  justify-center items-center '>
                        <input
                            style={{ height: '40px' }}
                            value={labValues.value} onChange={(e) => updateLabValues('value', e.target.value)} type="text" placeholder='Value' className="input input-bordered  mt-1.5 border-info w-full max-w-xs" />

                    </div>
                </div>
                <div className="form-control  w-3/4  px-1">

                    <div className='flex lg:flex-row  justify-center items-center '>
                        <input
                            style={{ height: '40px' }}
                            value={labValues.normalValue} onChange={(e) => updateLabValues('normalValue', e.target.value)} type="text" placeholder='Normal value' className="input input-bordered  mt-1.5 border-info w-full max-w-xs" />

                    </div>
                </div>
                <button
                    type='submit'
                    style={{ height: '40px' }}
                    className='bg-cyan-500 px-4 text-white ml-3 mt-2 rounded'>
                    ADD
                </button>
            </div>
        </form>
    );
};

export default LabFormValues;