import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './userBar.css'
class UserBar extends Component {

  state = { 
    username: null,
  };

  async load() {
    try {
      const userinfo = await this.props.keycloak.loadUserInfo()
      this.setState({ username: userinfo.preferred_username})
    } catch (err) {
      console.log(err)
    }
   
  }

  componentDidMount() {
    this.load()
  }
  render() {
    return <DropdownButton variant='secondary' title={this.state.username || ''} className="userBar">
      <Dropdown.Item onClick={ () => this.props.keycloak.logout() }>Logout</Dropdown.Item>
      <Dropdown.Item onClick={ () => this.props.keycloak.accountManagement() }>Account</Dropdown.Item>
    </DropdownButton >
  }
}
export default UserBar;