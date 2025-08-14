import { action, makeObservable, observable } from "mobx";
class ReservationServiceStore {
  isPopup: boolean = false;
  passenger: number = 0;
  bags: number = 0;
  constructor() {
    makeObservable(this, {
      isPopup: observable,
      setIspopup: action,
      passenger: observable,
      bags: observable,
      incrementPassenger: action,
      decrementPassenger: action,
      incrementBag: action,
      decrementBag: action,
    });
  }

  setIspopup(value: boolean) {
    this.isPopup = value || !this.isPopup;
  }

  incrementPassenger() {
 
      this.passenger++;

  }

  decrementPassenger() {
    if(this.passenger != 0) {
      this.passenger--;
    }
  }

  incrementBag() {

      this.bags++;

  }

  decrementBag() {
    if(this.bags != 0) {
      this.bags--;
    }
  }
}

const reservationServiceStore = new ReservationServiceStore();
export { reservationServiceStore };
