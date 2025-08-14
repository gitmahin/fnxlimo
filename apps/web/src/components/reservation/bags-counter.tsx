import { reservationServiceStore } from "@/services/store";
import { Counter } from "../counter";
import { observer } from "mobx-react";

export const BagsCounter = observer(() => {
  return (
    <Counter
      increment={() => reservationServiceStore.incrementBag()}
      decrement={() => reservationServiceStore.decrementBag}
      value={reservationServiceStore.bags}
    />
  );
});
