import { IResolvers } from "graphql-tools";
import { CourierQuery, CourierMutation } from "./resolvers/courier"

// Add all needed queries and mutations here
// Make sure to create them in their appropriate location first
// i.e.: resolvers/{model}
// and respect the naming format {model}Query and {model}Mutation
const resolvers: IResolvers = {
  Query: {
    ...CourierQuery
  },

  Mutation: {
    ...CourierMutation
  }
};

export default resolvers;
