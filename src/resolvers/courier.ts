import { ApolloError } from "apollo-server-express";

//A simple mock of a couriers list
let couriers: Array<any> = [
  {
    id: 1,
    max_capacity: 10,
  },
  {
    id: 2,
    max_capacity: 20,
  },
  {
    id: 3,
    max_capacity: 30,
  },
  {
    id: 4,
    max_capacity: 45,
  }
];

const findCourier = (id: Number) => {
  let courier = couriers.find(courier => courier.id == id)

  if (!courier) {
    throw new ApolloError(
      "Courier not found.",
      "COURIER_NOT_FOUND"
    );
  }

  return courier;
}

export const CourierQuery = {
  getAllCouriers: () => couriers,
  lookUpCouriersByMaxCapacity: (_root: any, args: any, _context: any) => {
    const { capacity_required } = args;
    let availableCouriers = couriers.filter(courier => courier.max_capacity >= capacity_required)

    return availableCouriers;
  }
}

export const CourierMutation = {
  updateCourierCapacity: (_root: any, args: any, _context: any) => {
    const { id, max_capacity } = args;

    let courier = findCourier(id);

    courier.max_capacity = max_capacity;

    return courier;
  },

  removeCourierCapacity: (_root: any, args: any, _context: any) => {
    const { id } = args;

    let courier = findCourier(id);

    courier.max_capacity = null;

    return courier;
  }
}
