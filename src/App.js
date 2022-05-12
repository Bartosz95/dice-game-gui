import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import keycloak from './libs/keycloak';
import 'bootstrap/dist/css/bootstrap.min.css';

import Welcome from './components/welcome/welcome';
import HomeGame from './components/homeGame/homeGame';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      keycloak: keycloak, 
      authenticated: false
    };
  }

  login() {
    keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    }).then(authenticated => {
      if(authenticated) {
        this.setState({ authenticated: authenticated })
      } else {
        keycloak.login()
      }
    })
  }

  componentDidMount() {
    keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    }).then(authenticated => {
      if(authenticated) {
        this.setState({ authenticated: authenticated })
      } else {
        window.location.replace('/welcome')
      }
    })
  }
  

  render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome state={this.state.authenticated} login={this.login.bind(this)}/>} />
        <Route path="/" element={ <HomeGame loadUserInfo={this.state.keycloak.loadUserInfo.bind(this)} /> } />
      </Routes>
      </BrowserRouter>
    );
  }
}
export default App;