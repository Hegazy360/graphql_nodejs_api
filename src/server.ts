import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import schema from "./schema";

const app = express();

const server = new ApolloServer({
  schema,
  // Enable live graphql playground on production
  // for testing purposes, not recommended in a real production environment
  introspection: true,
  playground: true,
});

const corstOpts = cors();
const path = "/api/v1"
const port = process.env.PORT || 4000;

app.use("*", corstOpts);

server.applyMiddleware({ app, path });

app.listen({ port }, () => {
  console.log(`API started on http://localhost:${port}${path}`);
});
