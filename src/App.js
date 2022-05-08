import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Welcome from './components/welcome/welcome';
import HomeGame from './components/homeGame/homeGame';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Welcome/>} />
        <Route path="/game" element={<HomeGame/>} />
      </Routes>
      </BrowserRouter>
    );
  }
}
export default App;