import './App.css';
import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {Countries, Country} from "./Country";
import Continents from "./Continent";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
            <Route exact path="/">
                <Redirect to="/continents" />
            </Route>
            <Route path="/continents">
                <Continents />
            </Route>
            <Route path="/country/:countryCode">
                <Country />
            </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
