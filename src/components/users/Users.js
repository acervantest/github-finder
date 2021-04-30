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
            },
            {
                id:'3',
                login: 'defunkt',
                avatar_url: 'https://avatars0.githubusercontent.com/u/2?v4',
                html_url: 'https://github.com/defunkt'
            },
            {
                id:'4',
                login: 'defunkt',
                avatar_url: 'https://avatars0.githubusercontent.com/u/2?v4',
                html_url: 'https://github.com/defunkt'
            }
        ]
    }

    render() {
        return (  
            <div style={userStyle}>
            { this.state.users.map( user => (
                    <UserItem key={user.id} user={user} />
            ))}
            </div>   
        )
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users;