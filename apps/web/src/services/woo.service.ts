import { AxiosHeaders } from "axios";
import { ApiService } from "./api.service";

export class WooCommerceService extends ApiService {
  constructor() {
    const auth =
      "Basic " +
      btoa(
        `${process.env.WOO_CONSUMER_KEY || ""}:${process.env.WOO_CONSUMER_SECRET || ""}`,
      );

    const headers = AxiosHeaders.from({
      Authorization: auth,
    });

    super("https://cms.finixlimo.com", headers);
  }
}
