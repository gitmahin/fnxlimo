import { getCustomerDetailsById } from "@/actions/user.action";
import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const response = await getCustomerDetailsById();
  const data = await response.data;
  return (
    <div className="p-3">
      <Image
        src={`${data?.avatar_url}` || null}
        width={200}
        height={200}
        className="w-[200px] h-[200px] rounded-md overflow-hidden object-cover object-center mb-5"
        alt="profile-image"
      />
      <p className="text-2xl font-medium mb-5">
        <b>Name:</b> {data?.first_name} {data?.last_name}
      </p>
      <p>
        <b>Email: </b> {data?.email}
      </p>
      <p>
        <b>Username: </b> {data?.username}
      </p>
    </div>
  );
}
