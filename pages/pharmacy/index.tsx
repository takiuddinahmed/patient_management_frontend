import Link from "next/link";
import { useState } from "react";
import Button from "../../components/basic/button.component";
import Navbar from "../../components/layouts/navbar.component";
import CardShow from "../../components/temp/cardShow";
import { IUser } from "../../interface/user.interface";


const Index = () => {

    const [user, setUser] = useState<IUser | null>(null);
    const [patientId, setPatientId] = useState<string>("")
    const [showCard, setShowCard] = useState<boolean>(false);




    return (
        <>
            <Navbar login={true} user={''} />
            <div className="flex justify-center items-center flex-col mt-5">
                <h1 className="text-4xl text-center">
                    Welcome {user?.firstName} {user?.lastName}
                </h1>

                {!showCard ? (
                    <div className="mx-auto mt-5">
                        <Button
                            onClick={() => {
                                setShowCard(true);
                            }}
                        >
                            Access Patient
                        </Button>
                    </div>
                ) : (
                    <CardShow />
                )}


                <div className="mt-5">
                    <span className="text-2xl">Access Patient Manually</span>
                    <form onSubmit={(e) => { e.preventDefault() }} >
                        <div className="form-control w-full max-w-xs px-3 mt-4">

                            <input value={patientId} onChange={(e) => setPatientId(e.target.value)} type="text" placeholder="Card Number" className="input input-bordered border-info w-full max-w-xs" />

                        </div>
                        <button type='submit' className='btn bg-cyan-600 text-white lg:mt-6 ms-5 mx-5'>
                            <Link href={{
                                pathname: "/pharmacy/[patientId]",
                                query: {
                                    patientId: patientId
                                }
                            }}>
                                <a className="no-underline hover:underline">
                                    Access Patient
                                </a>
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Index;