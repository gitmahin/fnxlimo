"use client";
import { getCustomerDetailsById } from "@/actions/user.action";
import { CustomerGetType } from "@/services";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [data, setData] = useState<CustomerGetType>();
  const [loading, setLoading] = useState(false);
  const handleGetCustomerDetails = async () => {
    try {
      const response = await getCustomerDetailsById();
      const data = await response.data;
      setData(data);
    } catch (error) {
      toast.error("Unautorized user");
    }
  };

  useEffect(() => {
    setLoading(true);
    handleGetCustomerDetails();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </>
  );
}
