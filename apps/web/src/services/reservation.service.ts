import {
  LocationType,
  reservationModel,
  ReservationStatusType,
} from "@/models/reservation.model";
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

export type UpdateOrderDataTypes = {
  order_id: number;
  product_id: number;
  pickup_date: string;
  pickup_time: string;
  pickup_location: string;
  dropoff_location: string;
  passenger: string;
  bags: string;
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
    await connDb();
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

  async updateReservation(
    data: UpdateOrderDataTypes
  ) {
    const auth =
      "Basic " + btoa(`${"admin"}:${"tm8F w1IJ qUdB lIU1 dZiJ 1QzG"}`);

    // TODO: do patch update reservation manually by user
    this.post(
      "/wp-json/apf-api/v1/update-order-item",
      data,
      {},
      {
        headers: {
          Authorization: auth,
        },
      }
    );
  }

  getOrderedReservations() {
    const response = this.get("/wp-json/wc/v3/orders/");
    return response;
  }

  async getUserReservations(userId: string) {
    await connDb();

    const reservations = await reservationModel
      .find({ user: new mongoose.Types.ObjectId(userId) })
      .lean();
    return reservations;
  }

  async getUserSingleReservation(userId: string) {
    await connDb();

    const reservation = await reservationModel.findOne({
      user: new mongoose.Types.ObjectId(userId),
      status: ReservationStatusType.CURRENT,
    }).sort({ createdAt: -1 });

    return reservation;
  }
}
