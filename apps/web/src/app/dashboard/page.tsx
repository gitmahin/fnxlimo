"use client";

import { DataTable } from "./components/data-table";
import { gql, useQuery } from "@apollo/client";
import { reservationServiceStore } from "@/services/store";

const GetUserReservations = gql`
  query GetReservationQuery {
    queryUserReservationOrderedData {
      bags
      createdAt
      passenger
      pickup_date
      pickup_time
      stop_locations {
        lat
        lng
      }
      pickup_location {
        lat
        lng
      }
      dropoff_location {
        lat
        lng
      }
      car_details {
        brands {
          name
        }
        images {
          src
          name
          alt
        }
        name
        price
        sale_price
        status
        total_sales
        stock_quantity
        id
      }
      _id
    }
  }
`;

function Page() {
  const { data, error, loading } = useQuery(GetUserReservations, {
    variables: {
      rID: reservationServiceStore.reservationID,
    },
  });

  return (
    <>
      {loading && <div className="px-5">Loading...</div>}
      {!loading && <DataTable data={data.queryUserReservationOrderedData} />}
    </>
  );
}

export default Page;
