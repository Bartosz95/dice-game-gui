import React, { Component } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';


import UserBar from '../userBar/UserBar';
import Navbar from '../navbar/Navbar'
import Game from '../game/game'
import Welcome from '../welcome/welcome'


export default class Secured extends Component {

  render() {
    // console.log(this.props)
    // this.props.loadUserInfo().then(userInfo => {
    //  console.log({name: userInfo.preferred_username, keycloak: props.keycloak})
    // });
    // if(this.props.keycloak) {
    //   if(this.props.authenticated) { 
    //     return <div>
    //       <Row>
    //         <Col>
    //           <Navbar />
    //         </Col>
    //         <Col>
    //           <UserBar keycloak={this.props.keycloak} />
    //         </Col>
    //       </Row>
    //       <Game keycloak={this.props.keycloak}/>
          
    //     </div>
    //   }
    //   else return <div>Unable to authenticate!</div>
    // }
    return <Spinner className="" animation="border" role="status">
      <span className="visually-hidden">Initializing Keycloak...</span>
    </Spinner>
  }
}