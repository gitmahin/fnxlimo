import { LocationType } from "@/models/reservation.model";
import { ApiService } from "./api.service";
import { WooCommerceService } from "./woo.service";

type CreateUserReservationType = {
  user_id: string;
  reserverd_car_woo_id: string;
  pickup_date: Date;
  pickup_time: Date;
  pickup_location: LocationType;
  dropoff_location: LocationType;
  stop_locations: LocationType[];
};

export class ReservationService extends WooCommerceService {
  async createUserReservation({
    user_id,
    reserverd_car_woo_id,
    pickup_date,
    pickup_time,
    pickup_location,
    dropoff_location,
    stop_locations,
  }: CreateUserReservationType) {}

  getOrderedReservations() {
    const response = this.get("/wp-json/wc/v3/orders/");
    return response;
  }
}
