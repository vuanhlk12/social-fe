import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Messenger from "./pages/messenger/Messenger";

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state?.auth?.user);
  if (!user) {
    localStorage.clear();
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

const CheckSignedRoute = (props) => {
  const user = useSelector((state) => state?.auth?.user);
  if (user) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

const App = () => {
  const user = useSelector((state) => state?.auth?.user);
  return (
    <Router>
      <Switch>
        <CheckSignedRoute path="/login">
          <Login />
        </CheckSignedRoute>
        <CheckSignedRoute path="/register">
          <Register />
        </CheckSignedRoute>
        <ProtectedRoute exact path="/">
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/messenger">
          <Messenger />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/:username">
          <Profile />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
};

export default App;
