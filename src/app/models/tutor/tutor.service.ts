import { UserModel } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

export const createTutorProfile = async (tutorData: IUser) => {
  const tutor = new UserModel(tutorData);
  return tutor.save();
};

export const getTutors = async (filters: any) => {
  return UserModel.find({ role: "tutor", ...filters });
};