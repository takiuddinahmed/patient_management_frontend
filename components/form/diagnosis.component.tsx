import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const dx: string[] = [

    "AML",
    "CML",
    "ALL",
    "CLL",
    "Limphoma",
    "Lung Cancer",
    "Breast Cancer",
    "Ovarium Cancer",
    "Prostetic Cancer",
    "Rectal Cancer",
    "Gastric Cancer"


];

interface IProp {
    addToDiagnosis: Function;
}
const DiagnosisForm: FC<IProp> = ({ addToDiagnosis }) => {
    const [diagnosisForm, setDiagnosisForm] = useState<string | null | undefined>('')
    const updateDiagnosisForm = (value: string) => {
        setDiagnosisForm(value)
    }
    const handleSubmit = () => {
        console.log(diagnosisForm);
        addToDiagnosis(diagnosisForm)
        setDiagnosisForm('')
    }
    return (
        <div className='mt-2 ml-3 rounded'>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className='flex flex:row'>
                <div>
                    <Autocomplete

                        value={diagnosisForm} onChange={(e, value) => updateDiagnosisForm(value || "")}
                        disablePortal
                        id="combo-box-demo"
                        options={dx}
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

export default DiagnosisForm;