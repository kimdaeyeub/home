import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import HomePage from "./Home";

const AppRouter = ({
  loggedInUser,
  isLoggedIn,
  register,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <HomePage loggedInUser={loggedInUser} />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth
              register={register}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
            />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
