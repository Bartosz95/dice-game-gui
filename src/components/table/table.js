import React from "react"
import { ListGroup, Badge, Container } from 'react-bootstrap';

export const Table = props => {
    const table = []
    for (const [name, value] of Object.entries(props.player.table)) {
        const result = <Badge bg="primary" pill>{value}</Badge>
        table.push(
        <ListGroup.Item key={name} as="li" action variant="secondary" >
                Figure {name} {value ? result : ''}
        </ListGroup.Item>)
    }
    return <Container>
        Table for player {props.player.id}
            <ListGroup as="ul">
                {table}
            </ListGroup>
            </Container>
}

export default Table