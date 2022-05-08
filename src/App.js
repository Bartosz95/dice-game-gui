
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'

import Home from './components/Home';
import Secured from './components/Secured';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/game" element={<Secured/>} />
      </Routes>
      </BrowserRouter>
    );
  }
}
export default App;