import React from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default props => <Accordion.Item eventKey={props.game._id}>
  <Accordion.Header>Game {props.game._id}</Accordion.Header>
    <Accordion.Body>
       {props.game.isActive ? "Active" : "Disactive"}<br/>
       Players: {props.game.playerIDs.join(', ')}<br/>
       <Link to={{ pathname: `/game/${props.game._id}` }} > PLAY </Link>
    </Accordion.Body>
</Accordion.Item>