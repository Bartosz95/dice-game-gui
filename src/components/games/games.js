import React, { Component } from 'react';


export default class Games extends Component {

  componentDidMount() {
    
    if(this.props.keycloak) {
      console.log(this.props.keycloak.authenticated)
    }
  }

  render() {
        return <div> Your games
        </div>
  }
}