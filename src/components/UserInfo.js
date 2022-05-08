import React, { Component } from 'react';

class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: ""
    };
    this.props.keycloak.loadUserInfo().then(userInfo => {
        this.setState({name: userInfo.name, id: userInfo.sub})
    });
  }

  render() {
    return (
      <div className="UserInfo">
        <p>Hi {this.state.name}!</p>
        <p>Your ID is  {this.state.id}</p>
      </div>
    );
  }
}
export default UserInfo;