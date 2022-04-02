import React from "react"
import { ListGroup } from 'react-bootstrap';

export const Table = props => {
    const table = []
    for (const [name, value] of Object.entries(props.player.table)) {
        table.push(<li class="list-group-item" key={name}>Figure {name} {value || 'not selected'}</li>)
    }
    return <ListGroup className={`list-group list-group-horizontal`}>
        Table for player {props.player.id}
            {table}
            </ListGroup>
}

export default Table