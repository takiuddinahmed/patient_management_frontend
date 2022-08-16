import { useRouter } from "next/router";
import { useEffect } from "react";
import { getLocalHostData } from "../utils/getLocalData.util";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const localdatastr = await getLocalHostData("user");
      console.log(localdatastr);
      if (!localdatastr) {
        router.push("/auth/login");
      } else {
        const userData = JSON.parse(localdatastr);
        console.log(userData);
        if (userData.userRole == "doctor") {
          router.push("/doctor");
        }
      }
    };
    load();
  }, []);

  return (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default HomePage;
