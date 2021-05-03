import React, { useContext, useState } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/AlertContext';

const Search = () => {

    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const { searchUsers, users, clearUsers } = githubContext;

    const [text, setText] = useState('');

    const onChange = (e) => setText(e.target.value);
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(text === '') {
            alertContext.setAlert('Please enter something.', 'light')
        }else {
            searchUsers(text);
            setText('');
        } 
    }

    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input type='text' name='text' value={text} 
                    onChange={onChange}
                    placeholder='Search users' />
                <input type='submit' value='search' className='btn btn-dark btn-block' />
            </form>
            {  (users.length > 0 ) &&
                ( <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> )
            }   
        </div>
    )
}

export default Search