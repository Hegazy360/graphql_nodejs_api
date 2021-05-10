import { ApolloError } from "apollo-server-express";
import { Courier } from "../models/Courier"

//A simple mock of a couriers list
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
  },
  {
    id: 3,
    max_capacity: 30,
    available_capacity: 20
  },
  {
    id: 4,
    max_capacity: 45,
    available_capacity: 15
  }
];

//find a courier by id
const findCourier = (id: number) => {
  let courier = couriers.find(courier => courier.id == id)

  if (!courier) {
    throw new ApolloError(
      "Courier not found.",
      "COURIER_NOT_FOUND"
    );
  }

  return courier;
}

//all courier related queries should be defined here
export const CourierQuery = {
  getAllCouriers: () => couriers,
  lookUpCouriersByMaxCapacity: (_root: any, args: any, _context: any) => {
    const { capacity_required } = args;
    let availableCouriers = couriers.filter(courier => courier.max_capacity >= capacity_required)

    return availableCouriers;
  },
  lookUpCouriersByAvailableCapacity: (_root: any, args: any, _context: any) => {
    const { capacity_required } = args;
    let availableCouriers = couriers.filter(courier => courier.available_capacity >= capacity_required)

    return availableCouriers;
  }
}

//all courier related mutations should be defined here
export const CourierMutation = {
  // Update a courier's maximum capacity
  updateCourierMaxCapacity: (_root: any, args: any, _context: any) => {
    const { id, max_capacity } = args;

    let courier: Courier = findCourier(id);

    if(courier.available_capacity > max_capacity) {
      courier.available_capacity = max_capacity;
    }

    courier.max_capacity = max_capacity;

    return courier;
  },

  // Update a courier's available capacity
  updateCourierAvailableCapacity: (_root: any, args: any, _context: any) => {
    const { id, available_capacity } = args;

    let courier: Courier = findCourier(id);

    if (available_capacity < 0 || available_capacity > courier.max_capacity) {
      throw new ApolloError(
        "Available capacity must be between 0 and courier's maximum capacity",
        "INVALID_AVAILABLE_CAPACITY"
      );
    }

    courier.available_capacity = available_capacity;

    return courier;
  },

  // Reset a courier's maximum capacity to 0
  removeCourierMaxCapacity: (_root: any, args: any, _context: any) => {
    const { id } = args;

    let courier = findCourier(id);

    courier.max_capacity = 0;
    courier.available_capacity = 0;

    return courier;
  }
}
