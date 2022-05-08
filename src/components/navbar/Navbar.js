import React from 'react';
import { Nav } from 'react-bootstrap';
import './navbar.css'

export default () => {

    return (
        <Nav menuVariant='dark' className="nav">
            <Nav.Item>
                <Nav.Link  href="/" className="logo"><img src="img/logo.png"/></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/" className="link-secondary navLink">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/game" className="link-secondary navLink">Game</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}