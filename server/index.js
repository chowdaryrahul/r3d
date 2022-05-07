// server/index.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress, GraphQLUpload } from 'graphql-upload';
import path from 'path'
import {typeDefs} from './schemas/typeDefs.js';
import {resolvers} from './schemas/Resolvers.js';
import { fileURLToPath } from 'url';
import gm from 'gm';
import mongoose from 'mongoose';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
let graphicMagick = gm.subClass({imageMagick: true});

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const app = express();

  await server.start();
  app.use('/files', express.static(path.join(__dirname,'schemas' ,'files')));
  app.use('/files', express.static('files'))
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

 mongoose.connect('mongodb://localhost:27017/red?directConnection=true&serverSelectionTimeoutMS=2000', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(async()=> await new Promise((r) => {
   app.listen({ port: 5000 }, r)
   console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);

  }))
  .catch((err)=>console.log(err))


}
startServer();
