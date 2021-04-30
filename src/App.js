import React, { Fragment, Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar title="Github Finder" icon="fab fa-github"/>
        <Users />
      </Fragment >
    );
  }
}

export default App;
