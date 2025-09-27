import { LocationType } from "@/models/reservation.model";
import { WooCommerceService } from "./woo.service";
import { BasicLocationType } from "@/types/global";

type GetNearByProducts = {
  pickup_lct: BasicLocationType;
  drop_off_lct: BasicLocationType;
};

export class ProductService extends WooCommerceService {
  async getProducts(categoryID?: number) {
    const response = this.get(
      `/wp-json/wc/v1/products?category=${categoryID || 0}`,
      {},
    );
    return response;
  }

  async getProductsCategories() {
    const response = this.get("/wp-json/wc/v1/products/categories");
    return response;
  }

  getProduct(id: number) {
    const response = this.get(`/wp-json/wc/v3/products/${id}`);
    return response;
  }

  static getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async getNearByProducts({ pickup_lct, drop_off_lct }: GetNearByProducts) {
    const response = await this.getProducts();
    const products = response.data;

    const pickup = pickup_lct;
    const dropoff = drop_off_lct;

    const maxDistance = 1.5;
    if (!pickup || !dropoff) {
      return []; // or handle differently
    }

    const filteredProducts = products.filter((product: any) => {
      const { lat, lng } = product.custom_acf_fields.location;

      const pickupDistance = ProductService.getDistance(
        pickup.lat,
        pickup.lng,
        lat,
        lng,
      );

      const dropoffDistance = ProductService.getDistance(
        dropoff.lat,
        dropoff.lng,
        lat,
        lng,
      );

      // Keep product if it's near pickup OR dropoff
      return pickupDistance <= maxDistance || dropoffDistance <= maxDistance;
    });

    return filteredProducts;
  }
}
