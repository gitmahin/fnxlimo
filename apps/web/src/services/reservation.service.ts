import { LocationType, reservationModel } from "@/models/reservation.model";
import { ApiService } from "./api.service";
import { WooCommerceService } from "./woo.service";
import connDb from "@/lib/connDb";
import mongoose from "mongoose";

export type CreateUserReservationType = {
  objectId: string;
  reserverd_car_woo_id: string;
  pickup_date: Date;
  pickup_time: string;
  pickup_location: LocationType;
  dropoff_location: LocationType;
  stop_locations: LocationType[];
  passenger: number;
  bags: number;
};

export class ReservationService extends WooCommerceService {
  async createUserReservation({
    objectId,
    reserverd_car_woo_id,
    pickup_date,
    pickup_time,
    pickup_location,
    dropoff_location,
    stop_locations,
    passenger,
    bags,
  }: CreateUserReservationType) {
    await connDb()
    const id = new mongoose.Types.ObjectId(objectId);
    const reservationData = new reservationModel({
      user: id,
      reserverd_car_woo_id,
      pickup_date,
      pickup_time,
      pickup_location,
      dropoff_location,
      stop_locations,
      passenger,
      bags,
    });

    await reservationData.save();
  }

  getOrderedReservations() {
    const response = this.get("/wp-json/wc/v3/orders/");
    return response;
  }
}
