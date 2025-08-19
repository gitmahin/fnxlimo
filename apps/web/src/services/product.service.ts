import { AxiosHeaders } from "axios";
import { ApiService } from "./api.service";

// key: "ck_687f1f4bae840fd4e7711be516ebefe47b0b0360"
// secret: "cs_7a31758464b5a6e67cd60753b25dbbc1885ff579";

class ProductService extends ApiService {
  constructor() {
    const auth =
      "Basic " +
      btoa(
        `${process.env.WOO_CONSUMER_KEY}:${process.env.WOO_CONSUMER_SECRET}`
      );

    const headers = AxiosHeaders.from({
      Authorization: auth,
    });

    super("https://cms.finixlimo.com", headers);
  }

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

export const productService = new ProductService();
