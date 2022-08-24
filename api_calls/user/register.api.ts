import { role } from "../../interface/user.interface";
import { fetchApi } from "../axios";

export interface IRegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userRole: role | "";
  cardId?: string;
  age?: number | string;
  sex?: string;
  doctorType?: string;
}
export interface IUserData {
  email: string;
  firstName: string;
  lastName: string;
  userRole: role | "";
  cardId?: string;
  age?: number | string;
  sex?: string;
  doctorType?: string;
}

export const initialLoginFormData: IRegisterForm = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  userRole: "",
  cardId: "",
  age: "",
  sex: "",
  doctorType: "",
};

export const initialUserData: IUserData = {
  email: "",
  firstName: "",
  lastName: "",
  userRole: "",
  cardId: "",
  age: "",
  sex: "",
  doctorType: "",
};
export const registerApi = async (data: IRegisterForm) => {
  try {
    if (data.age == "") data.age = "24";
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
