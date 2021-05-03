import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {
  return (
    <GithubState>
    <AlertState>
    <Router>
    <Fragment>
      <Navbar title="Github Finder" icon="fab fa-github"/>
      <div className='container'>
        <Alert />
        <Switch>
          <Route exact path='/' render={ () => (
            <Fragment>
              <Search />
              <Users />
            </Fragment>
          )}/>
          <Route path='/about' component={About} />
          <Route path='/user/:login' component={User} />
        </Switch> 
      </div> 
    </Fragment>
    </Router>
    </AlertState>
    </GithubState>
  );
}

export default App;
