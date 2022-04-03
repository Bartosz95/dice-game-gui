import React from "react"
import { Alert } from 'react-bootstrap';

export const Tip = props => {
    return <Alert variant="warning">{props.elems.tip}</Alert>
}

export default Tip
