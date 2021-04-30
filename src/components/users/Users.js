import React, { Component } from 'react';
import UserItem from './UserItem';

class Users extends Component {

    state = {
        users: [
            {
                id:'2',
                login: 'defunkt',
                avatar_url: 'https://avatars0.githubusercontent.com/u/2?v4',
                html_url: 'https://github.com/defunkt'
            }
        ]
    }

    render() {
        return (
            
            <div>
            { this.state.users.map( user => (
                    <UserItem key={user.id} user={user} />
            ))}
            </div>
            
        )
    }
}

export default Users;