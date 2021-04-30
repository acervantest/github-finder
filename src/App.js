import React, { Fragment, Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    loading: false,
    users: []
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get('https://api.github.com/users');

    this.setState({ users: res.data, loading:false });
  }

  render() {
    return (
      <Fragment>
        <Navbar title="Github Finder" icon="fab fa-github"/>
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div> 
      </Fragment >
    );
  }
}

export default App;
