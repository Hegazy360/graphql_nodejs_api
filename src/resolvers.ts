import { IResolvers } from "graphql-tools";
import { CourierQuery, CourierMutation } from "./resolvers/courier"

const resolvers: IResolvers = {
  Query: {
    ...CourierQuery
  },

  Mutation: {
    ...CourierMutation
  }
};

export default resolvers;
