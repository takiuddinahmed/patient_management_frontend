export type role = "patient" | "doctor" | "lab" | "pharmacy";

export interface IUser {
  firstName?: string;
  lastName?: string;
  userRole?: string;
  cardId?: string;
  age?: number;
  sex?: string;
}

export const users: IUser[] = [
  {
    firstName: "Jarzis",
    lastName: "Khan",
    userRole: "patient",
    cardId: "-dc-66-4a-49",
    age: 24,
    sex: "Male",
  },
  {
    firstName: "Abu",
    lastName: "Sufian",
    userRole: "patient",
    cardId: "-33-39-9c-1a",
    age: 24,
    sex: "Male",
  },
];
