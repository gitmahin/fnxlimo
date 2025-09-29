import { AxiosHeaders } from "axios";
import { ApiService } from "./api.service";

export class WooCommerceService extends ApiService {
  constructor() {
    const auth =
      "Basic " +
      btoa(
        `${process.env.WOO_CONSUMER_KEY || "ck_3aefca1886817206beff6a1a03b4e62a20829637"}:${process.env.WOO_CONSUMER_SECRET || "cs_f200f3befa398e238411111a57fbad287375233f"}`,
      );

    const headers = AxiosHeaders.from({
      Authorization: auth,
    });

    super("https://cms.finixlimo.com", headers);
  }
}
