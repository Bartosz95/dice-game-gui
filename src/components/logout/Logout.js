import React from 'react';
import { Button } from 'react-bootstrap';
import './logout.css'

export default props => {
    return <Button 
        className='logoutButton' 
        onClick={ () => props.keycloak.logout() }
        variant='secondary'>
            Logout
    </Button>
}

