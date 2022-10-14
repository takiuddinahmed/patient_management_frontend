import React, { FC, useState } from 'react';


interface IProp {
    addToComplaint: Function;
}
const CcForm: FC<IProp> = ({ addToComplaint }) => {
    const [complaintsForm, setComplaintsForm] = useState<string>('')

    const updateComplaintsForm = (value: string) => {
        setComplaintsForm(value)
    }

    const handleSubmit = () => {
        console.log(complaintsForm);
        addToComplaint(complaintsForm)
        setComplaintsForm('')
    }
    return (
        <div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} >
                <div className="form-control w-full max-w-xs px-3 mt-4">

                    <input value={complaintsForm} onChange={(e) => updateComplaintsForm(e.target.value)} type="text" placeholder="Complaints" className="input input-bordered border-info w-full max-w-xs" />

                </div>
                <button type='submit' className='btn btn-success text-white lg:mt-6  mx-3'>ADD</button>
            </form>

        </div>
    );
};

export default CcForm;