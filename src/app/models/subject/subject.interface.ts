import { Document } from 'mongoose';

export interface ISubject extends Document {
  name: string;
  gradeLevel: 'Primary' | 'Middle' | 'High School' | 'College' | 'University';
  category:
    | 'Mathematics'
    | 'Science'
    | 'Languages'
    | 'Arts'
    | 'Technology'
    | 'Business'
    | 'Programming'
    | 'Other';
}
