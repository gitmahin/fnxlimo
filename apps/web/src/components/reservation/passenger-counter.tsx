"use client";
import { reservationServiceStore } from "@/services/store";
import { observer } from "mobx-react";
import { Counter } from "../counter";

export const PassengerCounter = observer(() => {
  return (
    <Counter
      maxLength={2}
      max={99}
      increment={() => reservationServiceStore.indecPassenger("increment")}
      decrement={() => reservationServiceStore.indecPassenger("decrement")}
      value={reservationServiceStore.passenger}
      onChange={(val) => reservationServiceStore.setPassenger(val)}
    />
  );
});
