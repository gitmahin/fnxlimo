import { ApiService } from "./api.service";

const consumerKey = process.env.WOO_CONSUMER_KEY;
const consumerSecret = process.env.WOO_CONSUMER_SECRET;

class ProductService extends ApiService {
  private authHeader: string;
  constructor() {
    super("https://cms.finixlimo.com");
    this.authHeader =
      "Basic " +
      btoa(
        `${"ck_687f1f4bae840fd4e7711be516ebefe47b0b0360"}:${"cs_7a31758464b5a6e67cd60753b25dbbc1885ff579"}`
      );
  }

  async getProducts() {
    const response = this.get(
      "/wp-json/wc/v1/products",
      {},
      {
        headers: {
          Authorization: this.authHeader,
        },
      }
    );
    return response;
  }
}

export const productService = new ProductService();
