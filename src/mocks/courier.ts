import { Courier } from "../models/Courier"

let couriers: Array<Courier> = [
  {
    id: 1,
    max_capacity: 10,
    available_capacity: 5
  },
  {
    id: 2,
    max_capacity: 20,
    available_capacity: 20
  }
];


export default {
  Query: () => ({
    getAllCouriers: () => couriers
  }),
};
