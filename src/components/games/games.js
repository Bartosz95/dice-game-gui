import React, { Component } from 'react';
import { Container, Accordion } from 'react-bootstrap';

import GameInfo from '../gameInfo/gameInfo'

export default class Games extends Component {

  state = {
    games: []
  }

  async getGames() {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${this.props.keycloak.token}`
        },
    };
    const response = await fetch(`${process.env.REACT_APP_DICE_GAME_API}/user/1/game`, requestOptions)
    let body = await response.json();
    this.setState({ games: body })
    } catch (err) {
      console.log(err)
    }
    
  }

  componentDidMount() {
    this.getGames()
  }

  render() {
    const games = this.state.games.map(game => <GameInfo game={game} />)
    return <Container>
      <Accordion defaultActiveKey="0">
        {games}
      </Accordion>
    </Container>
  }
}