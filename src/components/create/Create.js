import React, { useState, useEffect } from 'react';


const Create = props => {

  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      if(props.keycloak.authenticated) {
        const requestOptions = {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${props.keycloak.token}`
          }
        };
        console.log(requestOptions)
        const response = await fetch(`http://localhost:8080/admin/realms/Bartosz/users`, requestOptions)
        const body = await response.json()
        setUsers(body.map(user => user.id))
      }
    } catch(err) {
      console.log(err)
    }
    
  }
  useEffect(() => { getUsers() })

  return (<div> Create Game {users.map(id => <div>{id}</div>)} </div>);

}

export default Create