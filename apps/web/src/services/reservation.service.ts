import { LocationType, reservationModel } from "@/models/reservation.model";
import { ApiService } from "./api.service";
import { WooCommerceService } from "./woo.service";
import connDb from "@/lib/connDb";

type CreateUserReservationType = {
  objectId: string;
  reserverd_car_woo_id: string;
  pickup_date: Date;
  pickup_time: Date;
  pickup_location: LocationType;
  dropoff_location: LocationType;
  stop_locations: LocationType[];
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
  }: CreateUserReservationType) {
    await connDb();

    const reservationData = new reservationModel({
      user: objectId,
      reserverd_car_woo_id,
      pickup_date,
      pickup_time,
      pickup_location,
      dropoff_location,
      stop_locations,
    });

    await reservationData.save();
  }

  getOrderedReservations() {
    const response = this.get("/wp-json/wc/v3/orders/");
    return response;
  }
}
