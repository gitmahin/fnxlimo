import { AxiosHeaders } from "axios";
import { ApiService } from "./api.service";
import { WooCommerceService } from "./woo.service";

// key: "ck_687f1f4bae840fd4e7711be516ebefe47b0b0360"
// secret: "cs_7a31758464b5a6e67cd60753b25dbbc1885ff579";

export class ProductService extends WooCommerceService {
  async getProducts(categoryID?: number) {
    const response = this.get(
      `/wp-json/wc/v1/products?category=${categoryID || 0}`,
      {}
    );
    return response;
  }

  async getProductsCategories() {
    const response = this.get("/wp-json/wc/v1/products/categories");
    return response;
  }
}
