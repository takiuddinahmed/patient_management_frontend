import React, { FC, useState } from 'react';
interface IProp {
    addToDerivativeForm: Function;
}

const DerivativeForm: FC<IProp> = ({ addToDerivativeForm }) => {

    const [derivativeForm, setDerivativeForm] = useState<string>('')

    const updateDerivativeForm = (value: string) => {
        setDerivativeForm(value)
    }

    const handleSubmit = () => {
        console.log(derivativeForm);
        addToDerivativeForm(derivativeForm)
        setDerivativeForm('')
    }
    return (
        <div className='mt-2 ml-3 rounded'>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
                className='flex items-center'>
                <textarea value={derivativeForm} onChange={(e) => updateDerivativeForm(e.target.value)} className="textarea textarea-info w-96" placeholder="Derivative Diagnosis"></textarea>
                <button type='submit' className='btn btn-primary px-10 mx-3'>Add</button>
            </form>
        </div>
    );
};

export default DerivativeForm;