import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import "./App.css";
import { AuthProvider } from "./firebase/Auth";
import Projects from "./pages/Projects";
import ItemView from "./pages/ItemView";
import Create from "./pages/Create";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";
import PrivateOutlet from "./components/PrivateOutlet";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import LastPage from "./pages/Lastpage";
import MyOrders from "./pages/myOrders";
import ProfilePage from "./pages/ProfilePage";
import Settings from "./pages/Settings";
import ContactUs from "./pages/ContactUs";
import {
  ApolloClient,
  split, HttpLink,  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from '@apollo/client/link/ws';
import { createUploadLink } from 'apollo-upload-client';

const httpLinkUpload = createUploadLink({
  uri: 'http://localhost:4000/graphql',
});

// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000/graphql'
// });

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
}
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  // httpLink,
  httpLinkUpload
);
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}>
              <Route path="/" element={<Dashboard client={client} />} />
              <Route path="/projects" element={<PrivateOutlet />}>
                <Route path="" element={<Projects client={client} />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/settings" element={<PrivateOutlet />}>
                <Route path="" element={<Settings />} />
              </Route>
              <Route path="/orders" element={<PrivateOutlet />}>
                <Route path="" element={<Orders />} />
              </Route>
              <Route path="/itemview/:_id" element={<ItemView />} />
              <Route path="/myorders" element={<PrivateOutlet />}>
                <Route path="" element={<MyOrders />} />
              </Route>
              <Route path="/profile" element={<PrivateOutlet />}>
                <Route path="" element={<ProfilePage />} />
              </Route>
              <Route path="/lastpage" element={<LastPage />} />
              <Route path="/create" element={<PrivateOutlet />}>
                <Route path="" element={<Create />} />
              </Route>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/404" element={<Page404 />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
