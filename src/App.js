
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Secured from './components/Secured';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/game">Game</Link></li>
          </ul>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/game" element={<Secured/>} />
          </Routes>
        </div>
        
      </BrowserRouter>
    );
  }
}
export default App;