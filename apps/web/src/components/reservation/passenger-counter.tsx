"use client";
import { reservationServiceStore } from "@/services/store";
import { observer } from "mobx-react";
import { Counter } from "../counter";

export const PassengerCounter = observer(() => {
  return (
    <Counter
      increment={() => reservationServiceStore.incrementPassenger()}
      decrement={() => reservationServiceStore.decrementPassenger()}
      value={reservationServiceStore.passenger}
    />
  );
});
