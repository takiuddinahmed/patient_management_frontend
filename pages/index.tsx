import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth, db } from "../components/firebase";
import { getLocalHostData } from "../utils/getLocalData.util";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser;
      const userData = await getDocs(
        query(collection(db, "users"), where("uid", "==", user?.uid))
      );

      userData.docs.forEach((doc) => {
        console.log(doc.data());
        const data = doc.data();
        if (
          data?.userRole == "doctor" &&
          !router.pathname.startsWith("doctor")
        ) {
          router.push("/doctor");
        } else if (
          data?.userRole == "pharmacy" &&
          !router.pathname.startsWith("pharmacy")
        ) {
          router.push("/pharmacy");
        } else if (
          data?.userRole == "lab" &&
          !router.pathname.startsWith("laboratory")
        ) {
          router.push("/laboratory");
        } else if (
          data?.userRole == "patient" &&
          !router.pathname.startsWith("patient")
        ) {
          router.push("/patient/" + data.uid);
        }
      });
    };
    console.log(auth.currentUser);
    if (auth.currentUser) {
      checkUser();
    } else {
      router.push("/auth/login");
    }
  }, []);
  return (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default HomePage;
