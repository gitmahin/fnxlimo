import { reservationServiceStore } from "@/services/store";
import { Counter } from "../counter";
import { observer } from "mobx-react";

export const BagsCounter = observer(() => {
  return (
    <Counter
      maxLength={2}
      max={99}
      increment={() => reservationServiceStore.incdecBag("increment")}
      decrement={() => reservationServiceStore.incdecBag("decrement")}
      value={reservationServiceStore.bags}
    onChange={(val) => reservationServiceStore.setBag(val)}
    />
  );
});
