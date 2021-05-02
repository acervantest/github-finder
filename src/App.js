import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import axios from 'axios';
import './App.css';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  const searchUserRepos = async login => {
    setLoading(true) ;

    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type })
   setTimeout( () => setAlert(null), 3000)
  }

  return (
    <GithubState>
    <Router>
    <Fragment>
      <Navbar title="Github Finder" icon="fab fa-github"/>
      <div className='container'>
        <Alert alert={alert}/>
        <Switch>
          <Route exact path='/' render={ () => (
            <Fragment>
              <Search  
                setAlert={showAlert}
              />
              <Users />
            </Fragment>
          )}/>
          <Route path='/about' component={About} />

          <Route path='/user/:login' render={ 
            (props) => (
              <User 
                {...props}
                repos={repos}
                getUserRepos={searchUserRepos}
              />
          )}/>
        </Switch> 
      </div> 
    </Fragment>
    </Router>
    </GithubState>
  );
}

export default App;
