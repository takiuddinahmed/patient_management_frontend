import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const test: string[] = [
    'ECG'
    , 'Echo Cardiogram'
    , 'Color Doppler Study'
    , 'ETT'
    , 'Troponin I'
    , 'Lipid Profile'
    , 'CT Scan'
    , 'MRI'
    , 'NCS'
    , 'X-Ray Spine'
    , 'CSF Study'
    , 'Serum Kreatinin'
    , 'USG of KUB'
    , 'X-Ray of KUB'
    , 'Renal Function Test'
    , 'Insulin TRS Test'
    , 'TSH'
    , 'FT4'
    , 'FT3'
    , 'S Calcium'
    , 'Para Thyroid Hormone'
    , 'RBS'
    , 'FBS'
    , 'OGTT'
    , 'VDRL'
    , 'Skin Scanning'
    , 'CBC'
    , 'IG E-level'
    , 'Mental State Examination'

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
                <button type='submit' className='btn btn-success text-white  mx-3'>ADD</button>
            </form>
        </div>
    );
};

export default InvestigationForm;






