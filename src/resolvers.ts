import { IResolvers } from "graphql-tools";

//A simple mock of a couriers list
let couriers: Array<any> = [
  {
    id: 1234,
    max_capacity: 10,
  },
  {
    id: 12345,
    max_capacity: 20,
  },
  {
    id: 1234,
    max_capacity: 25,
  },
  {
    id: 12345,
    max_capacity: 36,
  },
  {
    id: 1234,
    max_capacity: 48,
  },
  {
    id: 12345,
    max_capacity: 120,
  },
  {
    id: 1234,
    max_capacity: 200,
  },
  {
    id: 12345,
    max_capacity: 250,
  },
];

const resolvers: IResolvers = {
  Query: {
    getAllCouriers: () => couriers,
    lookUpCouriersByMaxCapacity: (_root, args, _context) => {
      const { capacity_required } = args;
      let availableCouriers = couriers.filter(courier => courier.max_capacity >= capacity_required)

      return availableCouriers;
    }
  },

  Mutation: {
    updateCourierCapacity: (_root, args, _context) => {
      const { id, max_capacity } = args;

      let courier = couriers.find(courier => courier.id == id)

      courier.max_capacity = max_capacity;

      return couriers[0]
    },
    addCourierCapacity: (_root, args, _context) => {
      const { id, max_capacity } = args;

      let courier = couriers.find(courier => courier.id == id)

      courier.max_capacity = max_capacity;

      return courier;
    },
    removeCourierCapacity: () => { }
  }
};
export default resolvers;
