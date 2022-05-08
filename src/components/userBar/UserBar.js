import React, { Component } from 'react';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import './userBar.css'
class UserBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      keycloak: ""
    };
    this.props.keycloak.loadUserInfo().then(userInfo => {
        this.setState({name: userInfo.preferred_username, keycloak: props.keycloak})
    });
  }

  render() {
    return <DropdownButton variant='secondary' title={this.state.name} className="userBar">
      <Dropdown.Item onClick={ () => this.state.keycloak.logout() }>Logout</Dropdown.Item>
      
    </DropdownButton >
  }
}
export default UserBar;