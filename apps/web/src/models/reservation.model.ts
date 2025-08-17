import mongoose, { Schema, Document } from "mongoose";
import { UserType } from "./user.model";
import { CarType } from "./car.model";

export type ReservationType = Document & {
  user: UserType;
  reserverd_car: CarType;
};

const model_name = "Reservation";

const ReservationSchema: Schema<ReservationType> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reserverd_car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const reservationModel =
  (mongoose.models?.[model_name] as mongoose.Model<ReservationType>) ||
  mongoose.model(model_name, ReservationSchema);
