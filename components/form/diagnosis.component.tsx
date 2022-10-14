import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const dx: string[] = [

    ' Myocardial Infarction ST elevated '
    , 'Myocardial Infarction Non-ST elevated'
    , 'Unstable Angina'
    , ' Heart Failure'
    , ' Angina Pectoris'
    , '1st Degree Heart Block'
    , '2nd Degree Heart Block'
    , '3rd Degree Heart Block'
    , 'Left Bundle Brunch Lock'
    , 'Right Bundle Brunch Lock'
    , 'Rheumatic Heart Disease'
    , 'Stroke(Ischemic Stroke & Hemorrhagic Stroke)'
    , 'Spinal Cord Injury'
    , 'Headache'
    , 'Migraine'
    , 'Gulliane Bari Syndrome'
    , 'Transverse Myelitis'
    , 'Cerebellar Hemorrhage'
    , 'Parkinson’s Disease'
    , 'Meningitis'
    , 'Encephalitis'
    , 'AKI'
    , 'CKD'
    , 'Renal Failure'
    , 'Acute Retention of Urine'
    , 'Nephrotic Syndrome'
    , 'Acute Glomerulo Nephritis'
    , 'IGA Nephropathy'
    , 'Renal Stone'
    , 'Hyperthyroidism'
    , 'Diabetes Mellitus'
    , 'Hypo Para Thyroidism'
    , 'Critinism'
    , 'Graves Disease'
    , 'Diabetes Incipidus'
    , 'Dwarfism'
    , 'Gigantism'
    , 'Scabis'
    , 'Dermatitis'
    , 'Eczema'
    , 'Ring Warm'
    , 'Vitiligo'
    , 'Hair Fall'
    , 'Acne Vulgaris'
    , 'Herpes'
    , 'Syphilis'
    , 'Gonorrhea'
    , 'Depressive Disorder'
    , 'Bipolar Mode Disorder'
    , 'Somatoform Disorder'
    , 'Acute Psychosis'
    , 'Schizophrenia'
    , 'Generalized Anxiety Disorder'
    , 'Conversion Disorder'


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
                <button type='submit' className='btn btn-success text-white mx-3'>ADD</button>
            </form>


        </div>
    );
};

export default DiagnosisForm;