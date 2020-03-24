import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route, Link, BrowserRouter, Switch, Redirect} from "react-router-dom";

import Login from "../src/pages/Login/Login";

const RotaPrivada = ({component : Component}) =>(
  <Route
      render={props =>
      localStorage.getItem("usuario-iexpo") !== null ? (
          <Component {...props}/> 
      ) : (
              <Redirect to={{pathname : "/"}} />
          )
      }
  />    
);

const Rotas = (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Login}/>
    </div>
  </BrowserRouter>
)

ReactDOM.render(Rotas , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
