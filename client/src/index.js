import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from "@apollo/client/utilities";
import { store } from './store'
import { Provider } from 'react-redux'
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
});
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5000/graphql',
  options: {
    reconnect: true,
    // connectionParams: {
    //     authToken: '<authToken>',
    // }
}
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


// const uploadLink = createUploadLink({
//   uri: 'http://localhost:5000/graphql',
// });

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllDetails: offsetLimitPagination()
        },
      },
    },
  }),
});


ReactDOM.render(
  <ApolloProvider client={client}>
<Provider store={store}>
    <App />
  </Provider>
</ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
