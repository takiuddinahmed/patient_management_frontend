import { setLocalHostData } from "../../utils/getLocalData.util";
import { fetchApi } from "../axios";

export interface ILoginForm {
  email: string;
  password: string;
}

export const initialLoginFormData: ILoginForm = {
  email: "",
  password: "",
};

export const loginApi = async (data: ILoginForm) => {
  try {
    const res = await fetchApi.post("/auth/login", data);

    if (res.status == 200) {
      setLocalHostData("user", res.data);
      return res.data;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};
