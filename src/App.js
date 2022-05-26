import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import keycloak from './libs/keycloak';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/login/login';
import Home from './components/home/home';

class App extends Component {

  state = { 
    keycloak: keycloak
  };

  async load() {
    try {
      const authenticated = await keycloak.init({
        onLoad: 'check-sso'
      })
      if(keycloak.authenticated) {
        this.setState({ authenticated: authenticated, keycloak: keycloak })
      } else {
        this.setState({ authenticated: false })
      }
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.load()
  }
  

  render() {
    return <BrowserRouter>
      <Routes>
        <Route path="/login" element={ keycloak.authenticated ? <Navigate to="/" /> : <Login keycloak={this.state.keycloak}/>} />
        <Route path="/" element={ keycloak.authenticated ? <Home keycloak={this.state.keycloak}/> : <Navigate to="/login" /> } />
      </Routes>
    </BrowserRouter>
  }
}
export default App;