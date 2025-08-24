import { AxiosHeaders } from "axios";
import { ApiService } from "./api.service";

export class WooCommerceService extends ApiService {
  constructor() {
    const auth =
      "Basic " +
      btoa(
        `${process.env.WOO_CONSUMER_KEY || "ck_c1d80949dfbd6ba07de1a8b6f2250ce5fa7edca3"}:${process.env.WOO_CONSUMER_SECRET || "cs_5f123e49c84eb0c56dbfe0fc8bf9f19d904404fd"}`
      );

    const headers = AxiosHeaders.from({
      Authorization: auth,
    });

    super("https://cms.finixlimo.com", headers);
  }
}
