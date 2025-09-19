import {
  LocationType,
  reservationModel,
  ReservationStatusType,
} from "@/models/reservation.model";
import { ApiService } from "./api.service";
import { WooCommerceService } from "./woo.service";
import connDb from "@/lib/connDb";
import mongoose from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

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
  flight_name?: string;
  flight_number?: string;
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
  flight_name: string,
  flight_number: string
};

export type CreateCustomReservationType = {
  payment_method?: string;
  payment_method_title?: string;
  set_paid?: boolean;
  billing?: {
    first_name?: string;
    last_name?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    email?: string;
    phone?: string;
  };
  shipping?: {
    first_name?: string;
    last_name?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
  line_items?: {
    product_id?: number;
    variation_id?: number;
    quantity?: number;
  }[];
  shipping_lines?: {
    method_id?: string;
    method_title?: string;
    total?: string;
  }[];
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
    flight_name,
    flight_number
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
      flight_name,
      flight_number
    });

    await reservationData.save();
  }

  async updateReservation(data: UpdateOrderDataTypes, userId: string) {
    const auth =
      "Basic " + btoa(`${"admin"}:${"tm8F w1IJ qUdB lIU1 dZiJ 1QzG"}`);

    await connDb();

    // TODO: do patch update reservation manually by user
    await this.post(
      "/wp-json/apf-api/v1/update-order-item",
      data,
      {},
      {
        headers: {
          Authorization: auth,
        },
      },
    );

    const reservation = await reservationModel.findOne({
      user: new mongoose.Types.ObjectId(userId),
      status: ReservationStatusType.CURRENT,
    });

    reservation.order_id = data.order_id;
    reservation.status = ReservationStatusType.OLD;
    await reservation.save({
      validateBeforeSave: false,
    });
  }

  getOrderedReservations() {
    const response = this.get("/wp-json/wc/v3/orders/");
    return response;
  }

  async getUserReservations(userId: string) {
    await connDb();

    const reservations = await reservationModel
      .find({ user: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 })
      .lean();
    return reservations;
  }

  async deleteUserReservations(_id: string, user_id: string) {
    await connDb()
    await reservationModel.deleteOne({ _id: new mongoose.Types.ObjectId(_id), user: new mongoose.Types.ObjectId(user_id) })
  }

  async getUserSingleReservation(userId: string) {
    await connDb();

    const reservation = await reservationModel
      .findOne({
        user: new mongoose.Types.ObjectId(userId),
        status: ReservationStatusType.CURRENT,
      })
      .lean();

    return reservation;
  }

  async createCustomReservation(data: CreateCustomReservationType) {
    const response = await this.post("/wp-json/wc/v3/orders", data);
  }
}
