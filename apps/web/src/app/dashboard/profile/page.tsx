"use client";
import { getCustomerDetailsById } from "@/actions/user.action";
import { CustomerGetType } from "@/services";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const {data} = useSession()
  return (
    <>
  
        <div className="p-3">
          <Image
            src={`${data?.user.image}` || null}
            width={200}
            height={200}
            className="w-[130px] h-[130px] rounded-md overflow-hidden object-cover object-center mb-5"
            alt="profile-image"
          />
          <p className="text-2xl font-medium mb-5">
            <b>Name:</b> {data?.user.name}
          </p>
          <p>
            <b>Email: </b> {data?.user.email}
          </p>
          <p>
            <b>Username: </b> {data?.user.email}
          </p>
          <p>
            <b>Customer Id: </b> {data?.user.woo_id}
          </p>
        </div>
 
    </>
  );
}
