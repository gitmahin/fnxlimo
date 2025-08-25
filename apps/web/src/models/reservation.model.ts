import mongoose, { Schema, Document } from "mongoose";
import { UserType } from "./user.model";

export type LocationType = Document & {
  lat: number;
  lng: number;
};

export type ReservationType = Document & {
  user: UserType;
  reserverd_car_woo_id: number;
  order_id: number;
  pickup_date: Date;
  pickup_time: String;
  pickup_location: LocationType;
  dropoff_location: LocationType;
  stop_locations: LocationType[];
  passenger: number;
  bags: number;
};

const model_name = "Reservation";

const LocationSchema: Schema<LocationType> = new Schema({
  lat: {
    type: Number,
    required: true,
    maxlength: 300,
  },
  lng: {
    type: Number,
    required: true,
    maxlength: 300,
  },
});

const ReservationSchema: Schema<ReservationType> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reserverd_car_woo_id: {
      type: Number,
      required: true,
    },
    order_id: {
      type: Number,
      required: true,
    },
    pickup_date: {
      type: Date,
      required: true,
      maxlength: 50,
    },
    pickup_time: {
      type: String,
      required: true,
      maxlength: 20,
    },
    pickup_location: LocationSchema,
    dropoff_location: LocationSchema,
    stop_locations: [LocationSchema],
    passenger: {
      type: Number,
    },
    bags: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const reservationModel =
  (mongoose.models?.[model_name] as mongoose.Model<ReservationType>) ||
  mongoose.model(model_name, ReservationSchema);
