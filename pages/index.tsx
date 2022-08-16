import { useRouter } from "next/router";
import { useEffect } from "react";
import { getLocalHostData } from "../utils/getLocalData.util";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      router.push("/doctor");
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
