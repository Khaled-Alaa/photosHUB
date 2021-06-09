
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage/index"
import HomePage from "./pages/HomePage/index"

import './App.css';






function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <LoginPage {...props} />} />
          <Route path="/Home" render={() => <HomePage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
