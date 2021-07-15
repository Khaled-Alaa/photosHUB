import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage/index";
import Layout from "./layout/PrivateLayout/index";
import SignupPage from "./pages/SignupPage/index";
import ProfilePage from "./pages/ProfilePage/index";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <LoginPage {...props} />} />
          <Route path="/SignUp" render={(props) => <SignupPage {...props} />} />
          <Route path="/Home" render={(props) => <Layout {...props} />} />
          <Route path="/Profile" render={(props) => <Layout {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
