import React, { Component } from 'react';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import './userBar.css'
class UserBar extends Component {

  state = { 
    username: ''
  };

  async load() {
    try {
      if(this.props.keycloak.authenticated) {
        const userinfo = await this.props.keycloak.loadUserInfo()
        this.setState({ username: userinfo.preferred_username })
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    this.load()
    return this.props.keycloak.authenticated ? <DropdownButton variant='secondary' title={this.state.username} className="userBar">
      <Dropdown.Item onClick={ () => this.props.keycloak.logout() }>Logout</Dropdown.Item>
      <Dropdown.Item onClick={ () => this.props.keycloak.accountManagement() }>Account</Dropdown.Item>
    </DropdownButton > : <Button variant="success" className="userBar" onClick={ () => this.props.keycloak.login() }>Login</Button>
  }
}
export default UserBar;