import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./layout/PrivateLayout";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <LoginPage {...props} />} />
          <Route path="/signup" render={(props) => <SignupPage {...props} />} />

          <Route
            path="/home"
            render={(props) => {
              return (
                <Layout
                  route={{ match: props.match, history: props.history, location: props.location }}
                >
                  <HomePage />
                </Layout>
              );
            }}
          />
          <Route
            path="/Profile/:id"
            render={(props) => {
              return (
                <Layout
                  route={{ match: props.match, history: props.history, location: props.location }}
                >
                  <ProfilePage />
                </Layout>
              );
            }}
          />
          <Route
            path="/settings"
            render={(props) => {
              return (
                <Layout
                  route={{ match: props.match, history: props.history, location: props.location }}
                >
                  <SettingsPage />
                </Layout>
              );
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

{
  /* <Switch>
          <Route
            path="/settings/:id"
            render={(route) => {
              return <EditPage user={this.state.user} route={route} />;
            }}
          />
          <Route path="/home">
            
          </Route>
          <Route
            path="/profile/:id"
            render={(route) => {
              return <ProfilePage user={this.state.user} route={route} />;
            }}
          />
        </Switch> */
}
