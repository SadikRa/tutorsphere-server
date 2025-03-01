import { Document } from "mongoose";

export interface ISubject extends Document {
  name: string;
  gradeLevel: string;
  category: string;
}