import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import logo from "./logo.svg";
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

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  fetchPolicy: "cache-and-network",
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}>
              <Route path="/" element={<Dashboard client={client} />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/itemview/:_id" element={<ItemView />} />
              <Route path="/orders" element={<PrivateOutlet />}>
                <Route path="" element={<Orders />} />
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
