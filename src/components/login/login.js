import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import './login.css'


const description = "I would like to invate you to play in dice game. You can play with other user or alone. The rules are vary simply. (...)"

export default props => <Stack className='col-md-5 mx-auto home' gap={2}>
      <h1>Welcome </h1>
      <h1>to dice-game</h1>
      <Button variant="success" onClick={ () => props.keycloak.login() }>Sign in and Play !</Button>
      {description}
</Stack>