// import { Connector, useMqttState } from "mqtt-react-hooks";
// import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { loadavg } from "os";
// import { useEffect, useState } from "react";
// import Button from "../components/basic/button.component";
// import Navbar from "../components/layouts/navbar.component";
// import CardShow from "../components/temp/cardShow";
// import { getLocalHostData } from "../utils/getLocalData.util";

// interface IUser {
//   firstName?: string;
//   lastName?: string;
//   userRole?: string;
//   cardId?: string;
// }

// const Home: NextPage = () => {
//   const [rfid, setRfid] = useState<string>("");
//   const [read, setRead] = useState<number>(0);
//   const [user, setUser] = useState<IUser | null>(null);
//   const [showCard, setShowCard] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     const load = async () => {
//       const localdatastr = await getLocalHostData("user");
//       console.log(localdatastr);
//       if (!localdatastr) {
//         router.push("/auth/login");
//       } else {
//         const userData = JSON.parse(localdatastr);
//         console.log(userData);
//         setUser(userData);
//       }
//     };
//     load();
//   }, []);

//   // useEffect(() => {
//   //   const fetchData = async (writeNull: boolean) => {
//   //     const res = await fetch("http://68.183.186.8:3500/iot");
//   //     if (res && res.ok) {
//   //       const data = await res.json();
//   //       console.log(data?.message);
//   //       if (data && data?.message?.length) {
//   //         setRfid(data.message);
//   //       } else {
//   //         if (writeNull) {
//   //           setRfid("");
//   //         }
//   //       }
//   //     }
//   //   };
//   //   fetchData(true);
//   //   const interval = setInterval(() => {
//   //     fetchData(false);
//   //   }, 1000);
//   //   return () => {
//   //     clearInterval(interval);
//   //   };
//   // }, [read]);

//   const showPatient = () => {
//     return (
//       <>
//         <div>
//           <h1 className="text-4xl text-center">
//             Welcome {user?.firstName} {user?.lastName}
//           </h1>
//           <h2 className="text-2xl text-center mt-2">
//             Your Card Id : {user?.cardId}
//           </h2>
//         </div>
//       </>
//     );
//   };

//   const showDoctor = (show: boolean) => {
//     console.log(show);
//     return (
//       <>
//         <div className="flex justify-center items-start flex-col">
//           <h1 className="text-4xl text-center">
//             Welcome {user?.firstName} {user?.lastName} {show}
//           </h1>

//           {!show ? (
//             <div className="mx-auto mt-5">
//               <Button
//                 onClick={() => {
//                   setShowCard(true);
//                 }}
//               >
//                 Access Patient
//               </Button>
//             </div>
//           ) : (
//             <CardShow />
//           )}
//         </div>
//       </>
//     );
//   };

//   return (
//     <>
//       <Navbar login={user != null} />
//       <div className="flex justify-center  items-start  mt-40 h-screen w-screen ">
//         {user?.userRole == "patient" ? showPatient() : showDoctor(showCard)}
//       </div>
//     </>
//   );
// };

// export default Home;

export default function Index() {
  return <h1>Hello world</h1>;
}
