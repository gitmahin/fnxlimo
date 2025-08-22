import { WooCommerceService } from "./woo.service";

type CreateWooCustomer = {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  phone?: string;
};

export class CustomerService extends WooCommerceService {
  createCustomer({
    email,
    first_name,
    last_name,
    username,
    company,
    address_1,
    address_2,
    city,
    state,
    postcode,
    country,
    phone,
  }: CreateWooCustomer) {
    this.post("/wp-json/wc/v3/customers", {
      email,
      first_name,
      last_name,
      username,
      billing: {
        first_name,
        last_name,
        company,
        address_1,
        address_2,
        city,
        state,
        postcode,
        country,
        phone,
        email,
      },
    });
  }
}
