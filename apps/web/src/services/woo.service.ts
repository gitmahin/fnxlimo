import { AxiosHeaders } from "axios";
import { ApiService } from "./api.service";

export class WooCommerceService extends ApiService {
  constructor() {
    const auth =
      "Basic " +
      btoa(
        `${process.env.WOO_CONSUMER_KEY || "ck_687f1f4bae840fd4e7711be516ebefe47b0b0360"}:${process.env.WOO_CONSUMER_SECRET || "cs_7a31758464b5a6e67cd60753b25dbbc1885ff579"}`
      );

    const headers = AxiosHeaders.from({
      Authorization: auth,
    });

    super("https://cms.finixlimo.com", headers);
  }
}
