import React, { Component } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';


import UserBar from '../userBar/UserBar';
import Navbar from '../navbar/Navbar'
import Game from '../game/game'


export default class Home extends Component {
  
  render() {
    if(this.props.keycloak.authenticated) {
        return <div>
          <Row>
            <Col>
              <Navbar />
            </Col>
            <Col>
              <UserBar keycloak={this.props.keycloak} />
            </Col>
          </Row>
          <Game keycloak={this.props.keycloak}/>
          
        </div>
    }
    return <Spinner className="" animation="border" role="status">
      <span className="visually-hidden">Initializing Keycloak...</span>
    </Spinner>
  }
}