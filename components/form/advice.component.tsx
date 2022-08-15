import React, { FC, useState } from 'react';
interface IProp {
    addToAdvice: Function;
}

const AdviceField: FC<IProp> = ({ addToAdvice }) => {

    const [adviceForm, setAdviceForm] = useState<string>('')

    const updateAdviceForm = (value: string) => {
        setAdviceForm(value)
    }

    const handleSubmit = () => {
        console.log(adviceForm);
        addToAdvice(adviceForm)
        setAdviceForm('')
    }
    return (
        <div className='mt-5'>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
                className='flex items-center'>
                <textarea value={adviceForm} onChange={(e) => updateAdviceForm(e.target.value)} className="textarea textarea-info w-96" placeholder="Advice"></textarea>
                <button type='submit' className='btn btn-success px-10 mx-3'>Add</button>
            </form>
        </div>
    );
};

export default AdviceField;