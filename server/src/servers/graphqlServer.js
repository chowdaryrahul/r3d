import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import mongoose from "mongoose";

const ApolloServerInit = async function (typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await mongoose.connect("mongodb://localhost:27017/r3d", {
    useNewUrlParser: true,
  });

  var db = mongoose.connection;
  // db.on("connection",console.info.bind("MongoDB connection established"));
  db.on("connection", (stream) => (console.log("MongoDB connection established")));
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(
    `🚀 Apollo GraphQL Server ready at http://localhost:4000${server.graphqlPath}`
  );
};

export default ApolloServerInit;
