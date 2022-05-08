import React, { Component } from 'react';
import keycloak from '../libs/keycloak';
import UserInfo from './UserInfo';
import Logout from './Logout';
import Game from './game/game'

class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      keycloak: null, 
      authenticated: false 
    };
  }

  componentDidMount() {
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
    })
  }

  render() {
    if(this.state.keycloak) {
      if(this.state.authenticated) return (
        <div>
          <UserInfo keycloak={this.state.keycloak} />
          <Logout keycloak={this.state.keycloak} />
          <Game />
        </div>
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}
export default Secured;