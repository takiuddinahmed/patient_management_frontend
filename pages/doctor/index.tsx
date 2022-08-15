import React, { useRef, useState } from 'react';
import Navbar from '../../components/layouts/navbar.component';


const index = () => {
    const [Name, setName] = useState('');
    const [Frequency, setFrequency] = useState('');
    const [Hour, setHour] = useState('');
    const [Period, setPeriod] = useState(0);
    const [Period2, setPeriod2] = useState('');







    const HandelSubmit1 = (e) => {




    }

    let prescriptionArray = [
        {
            Name: 'Tab.Napa',
            consumptionFrequency: '1+0+1',
            consumptionHour: 'P.M',
            consumptionPeriod: 7,
            consumptionPeriod2: 'Days'
        },

    ]





    return (
        <>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button rounded-none w-full lg:hidden ">Open More Details</label>
                    {/* <!-- Page content here --> */}
                    <div className='flex  justify-around text-lg py-2 border-b-2 border-cyan-600'>
                        <span>Name:</span>
                        <span>Age:</span>
                        <span>Sex:</span>
                    </div>
                    <div>

                        <div className='p-3'>
                            <span className='border-b-4 border-black font-semibold'> RX  : </span>
                            <ol className='list-decimal m-3'>
                                {prescriptionArray.map(pres =>

                                    <li>
                                        <span className='p-2 text-lg'>{pres.Name} </span> <br />
                                        <span className='p-2'> {pres.consumptionFrequency} </span>
                                        <span className='p-2'>{pres.consumptionHour}</span>
                                        <span className='p-2'>{pres.consumptionPeriod} {pres.consumptionPeriod2} </span>


                                    </li>



                                )}
                            </ol>




                        </div>

                        {/* input form for RX */}
                        <form onSubmit={e => { HandelSubmit1(e) }}>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
                                <div className="form-control w-full max-w-xs px-3">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Type here" className="input input-bordered border-info w-full max-w-xs" />

                                </div>
                                <div className="form-control w-full max-w-xs px-3 ">
                                    <label className="label">
                                        <span className="label-text">Frequency</span>
                                    </label>
                                    <input type="text" className="input input-bordered  border-info w-full max-w-xs" />

                                </div>
                                <div className='mt-2 flex flex-col w-full px-3'>
                                    <label className="label-text ">Consumption Time</label>
                                    <select className="select select-bordered border-info w-full mt-1.5 max-w-xs">
                                        <option>A.M</option>
                                        <option>P.M</option>
                                    </select>
                                </div>
                                <div className="form-control  w-full max-w-xs px-3">
                                    <label className="label-text">
                                        Consumption Period
                                    </label>
                                    <div className='flex lg:flex-row  justify-center items-center '>
                                        <input type="number" min={0} className="input input-bordered  mt-1.5 border-info w-full max-w-xs" />

                                    </div>
                                </div>
                                <div className="form-control  w-full max-w-xs px-3">
                                    <label className="label-text">
                                        Period
                                    </label>
                                    <select className="select select-bordered border-info w-full max-w-xs mt-1.5">
                                        <option>Days</option>
                                        <option>Weeks</option>
                                        <option>Months</option>
                                    </select>
                                </div>

                                <div>

                                    <button type='submit' onClick={HandelSubmit1} className='btn btn-success lg:mt-6 px-10 mx-3'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content border-r-2 border-cyan-600">
                        {/* <!-- Sidebar content here --> */}
                        <div className='my-2'>
                            <span className='border-b-4 border-black font-semibold'> CC : </span>
                            <select className="select select-bordered border-info w-full max-w-xs mt-1.5">
                                <option>Days</option>
                                <option>Weeks</option>
                                <option>Months</option>
                            </select>
                            <button className='btn btn-success lg:mt-6  mx-3'>Submit</button>
                        </div>
                        <div className='my-2'>
                            <span className='border-b-4 border-black font-semibold'> P.H : </span>
                        </div>
                        <div className='my-2'>
                            <span className='border-b-4 border-black font-semibold'> D.X : </span>
                        </div>


                    </ul>

                </div>
            </div>
        </>
    );
};

export default index;