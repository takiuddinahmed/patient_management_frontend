import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const test: string[] = [
    'PBF',
    'Bone Marrow Study',
    'Biopsy',
    'FNAC',
    'CBC'

];

interface IProp {
    addToInvestigation: Function;
}




const InvestigationForm: FC<IProp> = ({ addToInvestigation }) => {
    const [investigationForm, setInvestigationForm] = useState<string | null | undefined>('')
    const updateInvestigationForm = (value: string) => {
        setInvestigationForm(value)
    }
    const handleSubmit = () => {
        console.log(investigationForm);
        addToInvestigation(investigationForm)
        setInvestigationForm('')
    }
    return (
        <div className='mt-2 rounded ml-3'>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className='flex flex:row'>
                <div>
                    <Autocomplete

                        value={investigationForm} onChange={(e, value) => updateInvestigationForm(value || "")}
                        disablePortal
                        id="combo-box-demo"
                        options={test}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField  {...params} label=""


                        />}
                    />
                </div>
                <button type='submit' className='btn btn-primary  mx-3'>ADD</button>
            </form>
        </div>
    );
};

export default InvestigationForm;






