import React, { Component } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';

import keycloak from '../../libs/keycloak';
import UserBar from '../userBar/UserBar';
import Navbar from '../navbar/Navbar'
import Game from '../game/game'


export default class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      keycloak: null, 
      authenticated: false 
    };
  }

  componentDidMount() {
    keycloak.init({
      onLoad: 'login-required',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    }).then(authenticated => {
      if(authenticated) {
        this.setState({ keycloak: keycloak, authenticated: authenticated })
      } else {
        keycloak.login()
      }
    })
  }

  render() {
    if(this.state.keycloak) {
      if(this.state.authenticated) { 
        return <div>
          <Row>
            <Col>
              <Navbar />
            </Col>
            <Col>
              <UserBar keycloak={this.state.keycloak} />
            </Col>
          </Row>
          <Game keycloak={this.state.keycloak}/>
          
        </div>
      }
      else return <div>Unable to authenticate!</div>
    }
    return <Spinner className="" animation="border" role="status">
      <span className="visually-hidden">Initializing Keycloak...</span>
    </Spinner>
  }
}