import { action, makeObservable, observable } from "mobx";

type NumberIndecActionType = "increment" | "decrement";

class ReservationServiceStore {
  isPopup: boolean = false;
  passenger: number = 0;
  bags: number = 0;
  tripDurationHours: number = 0;
  tripDurationMins: number = 0;
  constructor() {
    makeObservable(this, {
      isPopup: observable,
      setIspopup: action,
      passenger: observable,
      bags: observable,
      tripDurationHours: observable,
      tripDurationMins: observable,
      incdecTripDurationHours: action,
      incdecTripDurationMins: action,
    });
  }

  setIspopup(value: boolean) {
    this.isPopup = value || !this.isPopup;
  }

  indecPassenger(type: NumberIndecActionType = "decrement", max: number = 99) {
    if (type === "decrement" && this.passenger != 0) {
      this.passenger--;
    } else {
      if(this.passenger < max) {
        this.passenger++;
      }
    }
  }

  setPassenger(val: number) {
    this.passenger = val;
  }

  incdecBag(type: NumberIndecActionType = "decrement" , max: number = 99) {
    if (type === "decrement" && this.bags != 0) {
      this.bags--;
    } else {
      if(this.bags < max) {
        this.bags++;
      }
    }
  }

  setBag(val: number) {
    this.bags = val;
  }
  incdecTripDurationHours(type: NumberIndecActionType = "decrement", max: number = 99) {
    if (type === "decrement" && this.tripDurationHours != 0) {
      this.tripDurationHours--;
    } else {
      if(this.tripDurationHours < max) {
        this.tripDurationHours++;
      }
    }
  }

  setTripDurationHours(val: number) {
    this.tripDurationHours = val;
  }

  incdecTripDurationMins(type: NumberIndecActionType = "decrement", max: number = 99) {
    if (type === "decrement" && this.tripDurationMins != 0) {
      this.tripDurationMins--;
    } else {
      if(this.tripDurationMins < max) {
       this.tripDurationMins++;
      }
    }
  }

  setTripDurationMins(val: number) {
    this.tripDurationMins = val;
  }
}

const reservationServiceStore = new ReservationServiceStore();
export { reservationServiceStore };
