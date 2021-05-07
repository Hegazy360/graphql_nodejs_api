import { join } from 'path';
import "graphql-import-node";
// import * as typeDefs from "./schema/schema.graphql";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLSchema } from "graphql";
import { addResolversToSchema } from '@graphql-tools/schema';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const schema = loadSchemaSync(join(__dirname, './schema/schema.graphql'), {
  loaders: [
    new GraphQLFileLoader(),
  ]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

export default schemaWithResolvers;
