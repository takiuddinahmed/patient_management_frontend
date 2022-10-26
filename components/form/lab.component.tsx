import React, { FC, useState } from 'react';
import { render } from 'react-dom';
import { fileURLToPath } from 'url';
import { ILabDataForm, initialLabDataForm, initialValues, IValues } from '../../api_calls/lab/lab.api';
import LabFormValues from './property.component';
interface IProp {
    addToLab: Function;
}

const LabData: FC<IProp> = ({ addToLab }) => {
    const [formType, setFormType] = useState('')
    const [selectType, setSelectType] = useState('')
    const [labDataForm, setLabDataForm] = useState<ILabDataForm>(initialLabDataForm)
    const [name, setName] = useState<string>('')


    const addToLabForm = (value: IValues) => {
        setLabDataForm((prev) => ({
            ...prev,
            values: [...prev.values, value],
        }));
    }


    const updateLabDataForm = (field: string, value: any) => {
        setLabDataForm((preValue) => ({ ...preValue, [field]: value }))
    }

    const updateFormType = () => {
        if (labDataForm.testName !== "") {
            setFormType(selectType);
            setName(labDataForm.testName)


        }
        else {
            alert("Please Enter Test Name")
            setSelectType("")
        }
    }

    const handleSubmit = () => {

        if (labDataForm.testName !== '' && labDataForm.values.length !== 0) {
            addToLab(labDataForm);
            setLabDataForm(initialLabDataForm)
            setFormType("")
            setName("")
        }
        else {
            alert('Please Enter Data')
            setLabDataForm(initialLabDataForm)
            setFormType("")
            setName("")
        }


    }


    return (
        <div>

            {name !== "" ?
                (<>
                    <span className='mx-7 text-lg text-semibold'>
                        Test  Name:  {name}
                    </span>
                    <table className="table mx-7 mt-4">
                        {
                            formType == "Input Value" ? (<thead className="text-center text-lg">

                                <tr>
                                    <th className="text-center text-lg">Property</th>
                                    <th className="text-center text-lg">Value</th>
                                    <th className="text-center text-lg">Normal Value</th>
                                </tr>
                            </thead>) : (<></>)
                        }
                        <tbody>

                            {
                                labDataForm.values.map((val) => (
                                    <tr className=" hover:bg-slate-200 text-center" key={val.property}>
                                        <td className=" hover:bg-slate-200">{val.property} </td>
                                        <td className=" hover:bg-slate-200">{val.value}</td>
                                        <td className=" hover:bg-slate-200">{val.normalValue}</td>


                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </>) : (<></>)
            }

            {name == "" ? (<div className='flex  justify-center items-center'>




                <div className=' mx-6 w-3/12'>
                    <label className='label'>
                        <span className='label-text'>Test Name</span>
                    </label>
                    <input
                        value={labDataForm.testName}
                        onChange={(e) => updateLabDataForm('testName', e.target.value)}
                        type="text" placeholder='Test Name'
                        className="input input-bordered  mt-1.5 border-info w-full " />

                </div>
                <div className=' w-3/12 mx-4 mt-11'>
                    <select
                        value={selectType}
                        onChange={(e) => setSelectType(e.target.value)}
                        className="select select-info">
                        <option selected>Select Type</option>
                        <option>Input Value</option>
                        <option>File</option>
                    </select>
                </div>



                <div className=' w-3/12 ml-5 mt-11'>
                    <button onClick={updateFormType}
                        className='btn btn-success text-white '>ADD</button>
                </div>

            </div>

            ) : (<></>)
            }












            <div className='w-full ml-10'>
                {formType == "Input Value" ? (


                    <LabFormValues addToLabForm={addToLabForm}></LabFormValues>) : (<></>)

                }





                {
                    formType == "File" ? (
                        <div className="mt-4 ml-8">
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                                <input
                                    style={{ height: '40px' }}
                                    className="bg-slate-200 border rounded-lg w-50 px-2 py-1"
                                    type="file"
                                    accept="image/* , .pdf"
                                />
                                <button
                                    style={{ height: '40px' }}
                                    className='bg-cyan-500 px-4 text-white ml-3 mt-2 rounded'>
                                    ADD
                                </button>
                            </form>
                        </div>) : (<></>)
                }
            </div>
            {
                name !== '' ? (<button onClick={handleSubmit} className='btn mx-7 mt-7'>Add To Report</button>) : (<></>)
            }

        </div >
    );
};

export default LabData;