import React, { Component } from 'react';


export default class Create extends Component {

  componentDidMount() {
    
    if(this.props.keycloak) {
      console.log(this.props.keycloak.authenticated)
    }
  }

  render() {
        return <div> Create Game </div>
  }
}