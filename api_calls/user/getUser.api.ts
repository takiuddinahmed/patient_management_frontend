import { fetchApi } from "../axios";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  userRole: string;
  cardId?: string;
  age?: number;
  sex?: string;
  doctorType?: string;
}

export const getUser = async (id: string) => {
  try {
    const res = await fetchApi.get("/auth/single/" + id);
    if (res.status == 200) {
      return res.data;
    } else {
      return null;
    }
  } catch (err: any) {
    console.log(err);
    return null;
  }
};
