import { ProductService, ReservationService } from "@/services";
import { extendType, intArg, objectType } from "nexus";
import { Products } from "./products.gqltype";

const productService = new ProductService();
const reservationService = new ReservationService();

const ReservationProductType = objectType({
  name: "ReservationProductType",
  definition(t) {
    t.int("product_id");
    t.field("product", {
      type: Products,
      async resolve(root) {
        const response = await productService.getProduct(
          root.product_id as number
        );
        return response.data;
      },
    });
  },
});

export const GetOrderedReservations = objectType({
  name: "OrderedReservationType",
  definition(t) {
    t.string("status");
    t.string("currency");
    t.string("discount_total");
    t.string("date_created");
    t.string("total");
    t.list.field("line_items", {
      type: ReservationProductType,
    });
  },
});

export const QueryOrderedReservations = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getOrderedReservations", {
      type: GetOrderedReservations,
      async resolve() {
        const response = await reservationService.getOrderedReservations();
        return response.data;
      },
    });
  },
});
