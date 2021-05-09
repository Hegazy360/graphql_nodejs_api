import { join } from 'path';
import "graphql-import-node";
import resolvers from "./resolvers";
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
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
