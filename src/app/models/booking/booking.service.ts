import { BookingModel } from "../models/booking.model";
import { IBooking } from "../interfaces/booking.interface";

export const createBooking = async (bookingData: IBooking) => {
  const booking = new BookingModel(bookingData);
  return booking.save();
};

export const getBookings = async (filters: any) => {
  return BookingModel.find(filters).populate("student tutor");
};