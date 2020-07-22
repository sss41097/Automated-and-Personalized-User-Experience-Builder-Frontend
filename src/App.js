import React, { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import "./style.css";
import { loadUser } from "./actions/auth";

//load routings
import appRoutes from "./utils/routes";

//load pages
import Home from "./Pages/HomePage/HomePage";
import Register from "./Pages/Registration/Register";
import Login from "./Pages/Login/Login";
import StudioEditor from "./Pages/StudioEditor/StudioEditor";
import StudioGroup from "./Pages/StudioGroup/StudioGroup";
import StudioProject from "./Pages/StudioProject/StudioProject";
import TeamManagement from "./Pages/TeamManagement/TeamManagement";
import AccountSettings from "./Pages/AccountSettings/AccountSettings";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    // load user if jwt token in local storage;
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path={appRoutes.homePage} component={Home} />
            <Route exact path={appRoutes.loginPage} component={Login} />
            <Route exact path={appRoutes.registerPage} component={Register} />
            <Route
              exact
              path={appRoutes.studioEditorPage}
              component={StudioEditor}
            />
            <Route
              exact
              path={appRoutes.studioProjectsPage}
              component={StudioProject}
            />
            <Route
              exact
              path={appRoutes.studioGroupsPage}
              component={StudioGroup}
            />
            <Route
              exact
              path={appRoutes.accountSettingsPage}
              component={AccountSettings}
            />
            <Route
              exact
              path={appRoutes.teamManagementPage}
              component={TeamManagement}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
