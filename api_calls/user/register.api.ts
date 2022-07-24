import { role } from "../../interface/user.interface";
import { fetchApi } from "../axios";

export interface IRegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userRole: role | "";
  cardId?: string;
}

export const initialLoginFormData: IRegisterForm = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  userRole: "",
  cardId: "",
};

export const registerApi = async (data: IRegisterForm) => {
  try {
    const res = await fetchApi.post("/auth/register", data);
    if (res.status == 201) {
      return res.data;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};
