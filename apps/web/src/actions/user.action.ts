"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { CustomerService } from "@/services";
import axios from "axios";
import { getServerSession } from "next-auth";

export async function createUser() {
  const response = await axios.post("/wp/v2/users");
  console.log(response);
}

export async function getCustomerDetailsById() {
  try {
    const session = await getServerSession(authOptions)
    if(!session) {
      return {error: "Invalid User"}
    }
  
    const customerService = new CustomerService()
    return {data: customerService.getCustomer(session.user.woo_id)}
  } catch (error) {
    return {error: "Error getting user"}
  }

}
