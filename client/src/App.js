import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import logo from "./logo.svg";
import "./App.css";
import { AuthProvider } from "./firebase/Auth";
import Projects from "./pages/Projects";
import Create from "./pages/Create";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";
import PrivateOutlet from "./components/PrivateOutlet";
import UploadFile from "./components/UploadFile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/create" element={<Create />}>
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
  //   <>
  //  {/* <UploadFile/>
  //   <Files/> */}
  //   </>
  );
}

export default App;
