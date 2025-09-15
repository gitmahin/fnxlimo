import { z } from "zod";

// Location
export const locationSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

// Car Brand
export const carBrandSchema = z.object({
  name: z.string(),
});

// Car Image
export const carImageSchema = z.object({
  src: z.string(),
  name: z.string(),
  alt: z.string(),
});

// Car Details
export const carDetailsSchema = z.object({
  brands: z.array(carBrandSchema),
  images: z.array(carImageSchema),
  name: z.string(),
  price: z.number(),
  sale_price: z.number(),
  status: z.string(),
  total_sales: z.number(),
  stock_quantity: z.number(),
});

// Reservation
export const reservationSchema = z.object({
  _id: z.string(),
  bags: z.number(),
  createdAt: z.date(), // Date field
  passenger: z.number(),
  pickup_date: z.string(), // change to z.date() if you want
  pickup_time: z.string(), // change to z.date() if you want
  stop_locations: z.array(locationSchema),
  pickup_location: locationSchema,
  dropoff_location: locationSchema,
  car_details: carDetailsSchema,
});

// Type from schema
export type ReservationType = z.infer<typeof reservationSchema>;
