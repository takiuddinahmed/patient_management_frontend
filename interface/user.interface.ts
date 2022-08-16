export type role = "patient" | "doctor" | "lab" | "pharmacy";

export interface IUser {
  firstName?: string;
  lastName?: string;
  userRole?: string;
  cardId?: string;
}
