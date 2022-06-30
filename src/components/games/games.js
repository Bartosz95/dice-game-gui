import React, { useState, useEffect } from 'react';
import { Container, Accordion } from 'react-bootstrap';

import GameInfo from './gameInfo'

const Games = props => {

  const [games, setGames] = useState([])

  const getGames = async () => {
    if(props.keycloak.authenticated && games.length === 0) {
      const userInfo = await props.keycloak.loadUserInfo()

      const requestOptions = {
        headers: {
            'Authorization': `Bearer ${props.keycloak.token}`
        }
      };
      const response = await fetch(`${process.env.REACT_APP_DICE_GAME_API}/user/${userInfo.sub}/game`, requestOptions)
      const body = await response.json()
      console.log(body)
      setGames(body)
    }
  }

  useEffect(() => { getGames() })

  return <Container>
    { games.map(game => <GameInfo key={game._id} game={game} />) }
  </Container>
}

export default Games