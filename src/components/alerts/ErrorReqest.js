import React from "react"
import { Alert } from 'react-bootstrap';

export const ErrorReqest = props => {
    return <Alert variant="danger">{props.elems.error}</Alert>
}

export default ErrorReqest
