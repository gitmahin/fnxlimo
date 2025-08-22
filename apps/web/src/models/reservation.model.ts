import mongoose, { Schema, Document } from "mongoose";
import { UserType } from "./user.model";
import { CarType } from "./car.model";

type LocationType = Document & {
  lat: string;
  lng: string;
}

export type ReservationType = Document & {
  user: UserType;
  reserverd_car: CarType;
  pickup_date: Date;
  pickup_time: Date;
  pickup_location: LocationType
  dropoff_location: LocationType
  stop_locations: LocationType[]
};

const model_name = "Reservation";

const LocationSchema: Schema<LocationType> = new Schema ({
  lat: {
    type: String,
    required: true,
    maxlength: 50
  },
  lng: {
    type: String,
    required: true,
    maxlength: 50
  }
})

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
    pickup_date: {
      type: Date ,
      required: true,
      maxlength: 50
    },
    pickup_time: {
      type: Date,
      required: true,
      maxlength: 20
    },
    pickup_location: LocationSchema,
    dropoff_location: LocationSchema,
    stop_locations: [LocationSchema]
  },
  {
    timestamps: true,
  }
);

export const reservationModel =
  (mongoose.models?.[model_name] as mongoose.Model<ReservationType>) ||
  mongoose.model(model_name, ReservationSchema);
