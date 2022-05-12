import React from 'react';
import { Nav } from 'react-bootstrap';
import './navbar.css'

export default () => {
    return <Nav className="nav">
        <Nav.Item>
            <Nav.Link  href="/home" className="logo"><img src="img/logo.png"/></Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/home" className="link-secondary navLink">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/games" className="link-secondary navLink">Your Games</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/create" className="link-secondary navLink">New Game</Nav.Link>
        </Nav.Item>
    </Nav>
}