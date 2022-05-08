import React from 'react';
import { Button } from 'react-bootstrap';

const Logout = keycloak => {

    console.log(keycloak.keycloak)
    return <Button 
        onClick={ () => keycloak.keycloak.logout() }
        variant='secondary'>
            Logout
    </Button>

}
export default Logout
