import React, { useState, useEffect } from 'react';
import { Container, Accordion } from 'react-bootstrap';

import GameInfo from '../gameInfo/gameInfo'

const Games = props => {

  const getGames = () => {
    console.log(props)
    const requestOptions = {
      headers: {
          'Authorization': `Bearer ${props.keycloak.token}`
      },
      mode: 'no-cors',
    };

    console.log(requestOptions)

    fetch(`http://localhost:3000/api/v1/user/1/game/6269a20f9ac7b2241521cd39`, requestOptions)
    .then(response => console.log(response))
    .then(responseData => {console.log(responseData)})
    .catch(err => {console.log(err) })
  }

  useEffect(() => {getGames()}, [])
  //this.getGames()
  // const games = this.state.games.map(game => <GameInfo game={game} />)
  // return <Container>
  //   <Accordion defaultActiveKey="0">
  //     {games}
  //   </Accordion>
  // </Container>
  return <div>Games</div>
}

export default Games