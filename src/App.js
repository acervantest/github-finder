import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    loading: false,
    users: [],
    alert: null,
    user: {},
    repos: []
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_CLIENT_SECRET}`);

    this.setState({ users: res.data, loading: false });
  }

  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  }

  searchUser = async login => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${login}?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  }

  searchUserRepos = async login => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading: false });
  }

  clearUsers = () => this.setState({ users: [], loading: false })

  setAlert = (msg, type) => {
   this.setState({ alert: { msg, type }})
   setTimeout( () => this.setState({ alert: null }), 3000)
  }

  render() {

    const { users, loading, user, repos } = this.state;

    return (
      <Router>
      <Fragment>
        <Navbar title="Github Finder" icon="fab fa-github"/>
        <div className='container'>
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' render={ props => (
              <Fragment>
                <Search 
                  searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={users.length > 0 ? true : false} 
                  setAlert={this.setAlert}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )}/>
            <Route path='/about' component={About} />

            <Route path='/user/:login' render={ 
              props => (
                <User 
                  {...props} 
                  getUser={this.searchUser} 
                  user={user}
                  loading={loading}
                  repos={repos}
                  getUserRepos={this.searchUserRepos}
                />
            )}/>
          </Switch> 
        </div> 
      </Fragment>
      </Router>
    );
  }
}

export default App;
