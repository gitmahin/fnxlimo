import { reservationServiceStore } from "@/services/store";
import { Counter } from "../counter";
import { observer } from "mobx-react";

export const TripDurationHours = observer(() => {
  return (
    <Counter
      maxLength={2}
      max={99}
      increment={() =>
        reservationServiceStore.incdecTripDurationHours("increment")
      }
      decrement={() =>
        reservationServiceStore.incdecTripDurationHours("decrement")
      }
      value={reservationServiceStore.tripDurationHours}
      onChange={(val) => reservationServiceStore.setTripDurationHours(val)}
    />
  );
});

export const TripDurationMins = observer(() => {
  return (
    <Counter
      maxLength={2}
      max={60}
      increment={() =>
        reservationServiceStore.incdecTripDurationMins("increment")
      }
      decrement={() =>
        reservationServiceStore.incdecTripDurationMins("decrement")
      }
      value={reservationServiceStore.tripDurationMins}
      onChange={(val) => reservationServiceStore.setTripDurationMins(val)}
    />
  );
});
