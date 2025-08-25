import {
  extendType,
  objectType,
  asNexusMethod,
  intArg,
  stringArg,
} from "nexus";
import { Products } from "./products.gqltype";
import { ProductService, ReservationService } from "@/services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { GraphQLDateTime } from "graphql-scalars";

export const GQLDate = asNexusMethod(GraphQLDateTime, "date");

const LocationDataType = objectType({
  name: "locationDataType",
  definition(t) {
    t.float("lat");
    t.float("lng");
  },
});

export const UserReservationOrderedDataType = objectType({
  name: "userreservationOrderedDataType",
  definition(t) {
    t.string("_id");
    t.int("reserverd_car_woo_id");
    t.date("pickup_date");
    t.string("pickup_time");
    t.field("pickup_location", {
      type: LocationDataType,
    });
    t.field("dropoff_location", {
      type: LocationDataType,
    });
    t.list.field("stop_locations", {
      type: LocationDataType,
    });
    t.int("passenger");
    t.int("bags");
    t.date("createdAt");
    t.field("car_details", {
      type: Products,
      async resolve(root) {
        const productService = new ProductService();
        const response = await productService.getProduct(
          root.reserverd_car_woo_id as number
        );
        return response.data;
      },
    });
  },
});

export const QueryUserReservationOrderedData = extendType({
  type: "Query",
  definition(t) {
    t.list.field("queryUserReservationOrderedData", {
      type: UserReservationOrderedDataType,
      async resolve(_root) {
        const reservationService = new ReservationService();
        const session = await getServerSession(authOptions);
        const response = await reservationService.getUserReservations(
          "68aaaeab80a24c60fe088abb"
        );
        return response || [];
      },
    });
  },
});

export const QueryUserSingleReservationOrderedData = extendType({
  type: "Query",
  definition(t) {
    t.field("queryUserSingleReservationOrderedData", {
      type: UserReservationOrderedDataType,
      args: {
        id: stringArg()
      },
      async resolve(_root, args: {id: string}) {
        const reservationService = new ReservationService();
        const session = await getServerSession(authOptions);
        const response = await reservationService.getUserSingleReservation(
          "68aaaeab80a24c60fe088abb",
          args.id
        );
        return response || {};
      },
    });
  },
});

