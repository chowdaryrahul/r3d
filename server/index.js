import ApolloServerInit from "./src/servers/graphqlServer";
import typeDefs from "./src/schema/typeDefs";
import resolvers from "./src/schema/resolvers";

(async () => {
  //Initialize Apollo Graphql Server
  ApolloServerInit(typeDefs, resolvers);
})();
