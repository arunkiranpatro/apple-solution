import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import NavBar from "./components/Auth/NavBar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Profile/Dashboard";
import CreateProfile from "./components/Profile/CreateProfile";
import setAuthToken from "./utilities/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./store/actions/register";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    //store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

function Router() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <h1>Dating Application</h1>
        <NavBar />
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <PrivateRoute
            path="/dashboard"
            exact
            component={Dashboard}
            redirectURL="/register"
          />
          <PrivateRoute path="/createProfile" exact component={CreateProfile} />
          <PrivateRoute path="/edit-profile" exact component={CreateProfile} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default Router;
