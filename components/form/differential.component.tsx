import React, { FC, useState } from 'react';
interface IProp {
    addToDifferentialForm: Function;
}

const DifferentialForm: FC<IProp> = ({ addToDifferentialForm }) => {

    const [differentialForm, setDifferentialForm] = useState<string>('')

    const updateDifferentialForm = (value: string) => {
        setDifferentialForm(value)
    }

    const handleSubmit = () => {
        console.log(differentialForm);
        addToDifferentialForm(differentialForm)
        setDifferentialForm('')
    }
    return (
        <div className='mt-2 ml-3 rounded'>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
                className='flex items-center'>
                <textarea value={differentialForm} onChange={(e) => updateDifferentialForm(e.target.value)} className="textarea textarea-info w-96" placeholder="Differential Diagnosis"></textarea>
                <button type='submit' className='btn btn-primary px-10 mx-3'>Add</button>
            </form>
        </div>
    );
};

export default DifferentialForm;