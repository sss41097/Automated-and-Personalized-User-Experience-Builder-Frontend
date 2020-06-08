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
import { positions, Provider as AlertProvider } from "react-alert";
import { loadUser } from "./actions/auth";
import AlertTemplate from "react-alert-template-basic";

//load routings
import appRoutes from "./utils/routes";

//load pages
import Home from "./Pages/HomePage/HomePage";
import Register from "./Pages/Registration/Register";
import Login from "./Pages/Login/Login";
import StudioEditor from "./Pages/StudioEditor/StudioEditor";
import StudioComponents from "./Pages/StudioComponents/StudioComponents";
import StudioProject from "./Pages/StudioProject/StudioProject";
import TeamManagement from "./Pages/TeamManagement/TeamManagement";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AccountSettings from "./Pages/AccountSettings/AccountSettings";

const options = {
  timeout: 2500,
  position: positions.TOP_CENTER,
};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    // loadUser();
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
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
                path={appRoutes.studioComponentsPage}
                component={StudioComponents}
              />
              <Route
                exact
                path={appRoutes.studioProjectPage}
                component={StudioProject}
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
              <Route
                exact
                path={appRoutes.dashboardPage}
                component={Dashboard}
              />
            </Switch>
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>
  );
};

export default App;
