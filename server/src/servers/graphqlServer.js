import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { execute, subscribe } from "graphql";
import { fileURLToPath } from 'url';
import gm from 'gm';
import { graphqlUploadExpress, GraphQLUpload } from 'graphql-upload';
import path from 'path'



const ApolloServerInit = async function (typeDefs, resolvers) {
  // Required logic for integrating with Express
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  let graphicMagick = gm.subClass({imageMagick: true});

  const PORT = process.env.PORT || 4000;
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({typeDefs, resolvers})
  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    uploads: false
  });

  // More required logic for integrating with Express
  await server.start();
  app.use('/files', express.static(path.join(__dirname,'schemas' ,'files')));
  app.use('/files', express.static('files'))
  app.use(graphqlUploadExpress());
  server.applyMiddleware({
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/graphql",
  });
  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );
  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
  );
};

export default ApolloServerInit;
