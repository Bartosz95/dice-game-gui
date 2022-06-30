import React, { useState, useEffect } from 'react';
import { Container, Accordion } from 'react-bootstrap';

import GameInfo from '../gameInfo/gameInfo'

const Games = props => {

  const [games, setGames] = useState([])

  const getGames = async () => {
    if(props.keycloak.authenticated) {
      const requestOptions = {
        headers: {
            'Authorization': `Bearer ${props.keycloak.token}`
        }
      };
      const response = await fetch(`${process.env.REACT_APP_DICE_GAME_API}/user/1/game`, requestOptions)
      const body = await response.json()
      console.log(body)
      setGames(body)
    }
  }

  useEffect(() => { getGames() })

  return <Container>
    { games.map(game => <GameInfo game={game} />) }
  </Container>
}

export default Games