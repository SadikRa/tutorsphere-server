import { Schema, model } from "mongoose";
import { ISubject } from "../interfaces/subject.interface";

const subjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true },
    gradeLevel: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export const SubjectModel = model<ISubject>("Subject", subjectSchema);