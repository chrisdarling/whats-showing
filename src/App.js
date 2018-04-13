import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './components/appContainer';
import 'antd/dist/antd.css';
import './app.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppContainer  />
      </BrowserRouter>
    );
  }
}

export default App;
