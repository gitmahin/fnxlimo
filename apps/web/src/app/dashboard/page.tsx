"use client";
import { AppSidebar } from "./components/app-sidebar";
import { ChartAreaInteractive } from "./components/chart-area-interactive";
import { DataTable } from "./components/data-table";
import { SectionCards } from "./components/section-cards";
import { SiteHeader } from "./components/site-header";
import { SidebarInset, SidebarProvider } from "@fnx/ui";

import data from "./data.json";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
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
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {loading && <div className="px-5">Loading...</div>}
              {!loading && (
                <DataTable data={data.queryUserReservationOrderedData} />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Page;
