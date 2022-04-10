import React from "react"
import { Alert } from 'react-bootstrap';

export const AlertMessage = props => {
    return <Alert variant="warning">{props.elems.message}</Alert>
}

export default AlertMessage
