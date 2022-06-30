import React, { useState, useEffect } from 'react';


const Create = props => {

  const [users, setUsers] = useState([])

  
  console.log(props)

  const getUsers = () => {
    
      const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${props.keycloak.token}`
        },
      };
      fetch(`http://localhost:8080/admin/master/console/#/realms/Bartosz/users`, requestOptions)
      .then(response => response.json())
      .then(responseData => {console.log(responseData)})
      .catch(err => console.log(err))

  }
  useEffect(() => { getUsers() })

  return (<div> Create Game </div>);

}

export default Create