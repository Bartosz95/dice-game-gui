import React, { Component } from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import keycloak from './libs/keycloak';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserBar from './components/userBar/UserBar';
import Navbar from './components/navbar/Navbar'
import Home from './components/home/home';

class App extends Component {

  state = { 
    keycloak: keycloak
  };

  async load() {
    try {
      await keycloak.init({ onLoad: 'check-sso' })
      
      if(keycloak.authenticated) {
        this.setState({ keycloak: keycloak })
      } else {
        console.log("not auth")
      }
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.load()
  }
  

  render() {
    return <div>
      <Row>
        <Col>
          <Navbar />
        </Col>
        <Col>
          <UserBar keycloak={this.state.keycloak} />
        </Col>
      </Row>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home keycloak={this.state.keycloak}/> } />
        </Routes>
      </BrowserRouter>
    </div>
  }

}
export default App;