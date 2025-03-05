import { Schema, model } from 'mongoose';
import { ISubject } from './subject.interface';

const subjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    gradeLevel: {
      type: String,
      required: true,
      enum: ['Primary', 'Middle', 'High School', 'College', 'University'],
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Mathematics',
        'Science',
        'Languages',
        'Arts',
        'Technology',
        'Business',
        'Programming',
        'Other',
      ],
    },
  },
  { timestamps: true },
);

export const SubjectModel = model<ISubject>('Subject', subjectSchema);
