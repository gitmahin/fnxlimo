"use client";
import { format } from "date-fns";
import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { reservationServiceStore } from "@/services/store";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@fnx/ui";
import { Trash2 } from "lucide-react";
import { deleteReservationById } from "@/actions/server.actions";
import toast from "react-hot-toast";
import { useReverseGeocode } from "@/hooks";

const GetUserReservations = gql`
  query GetReservationQuery {
    queryUserReservationOrderedData {
      _id
      passenger
      bags
      pickup_date
      pickup_time
      createdAt
      pickup_location {
        lat
        lng
      }
      dropoff_location {
        lat
        lng
      }
      car_details {
        name
        price
        sale_price
        status
        id
      }
    }
  }
`;

function formatDateTime(date: string, time: string) {
  try {
    const combined = new Date(`${date}T${time}`);
    return format(combined, "PPP 'at' p");
    // Example: Jan 17, 2025 at 3:30 PM
  } catch {
    return `${date} at ${time}`;
  }
}

export default function Page() {
  const { data, loading } = useQuery(GetUserReservations, {
    variables: {
      rID: reservationServiceStore.reservationID,
    },
  });

  const [items, setItems] = React.useState<any[]>([]);
  const [loadingDelete, setLoadingDelete] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (data?.queryUserReservationOrderedData) {
      setItems(data.queryUserReservationOrderedData);
    }
  }, [data]);

  const deleteReservation = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );
    if (!confirmDelete) return;

    try {
      setLoadingDelete(id);
      const response = await deleteReservationById(id);
      if (response.error) {
        console.log("Error deleting reservation");
        throw new Error(toast.error.toString());
      } else {
        setItems((prev) => prev.filter((item) => item._id !== id));
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDelete(null);
    }
  };

  if (loading) return <div className="px-5">Loading...</div>;

  return (
    <div className="flex flex-col gap-4 items-start w-full p-4">
      {items.map((res) => (
        <Card key={res._id} className="w-full">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>{res.car_details?.name ?? "Unknown Car"}</CardTitle>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => deleteReservation(res._id)}
              disabled={loadingDelete === res._id}
            >
              {loadingDelete === res._id ? "..." : <Trash2 size={20} />}
            </Button>
          </CardHeader>

          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Passenger:</strong> {res.passenger}
            </p>
            <p>
              <strong>Bags:</strong> {res.bags}
            </p>
            <p>
              <strong>Pickup:</strong>{" "}
              {formatDateTime(res.pickup_date, res.pickup_time)}
            </p>
            <p>
              <strong>Pickup Location:</strong>{" "}
              {useReverseGeocode(
                Number(res.pickup_location.lat),
                Number(res.pickup_location.lng)
              )}
            </p>
            <p>
              <strong>Dropoff Location:</strong>{" "}
              {useReverseGeocode(
                Number(res.dropoff_location.lat),
                Number(res.dropoff_location.lng)
              )}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {res.car_details?.sale_price ?? res.car_details?.price}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
