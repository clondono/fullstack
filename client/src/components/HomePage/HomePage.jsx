import React, { useEffect, useState  } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd'

import Config from '../../config'
import { authActions, } from '../../actions'

function HomePage(Props) {
    // const users = useSelector(state => state.users);
    const user = useSelector(store => store.auth.user);
    const dispatch = useDispatch();
    const logout =  () => {
        dispatch(authActions.logout()); 
    }
    useEffect(() => {
    }, []);
    
    return (
       
        <div className="col-lg-8 offset-lg-2">
          <h1>Hi {user.first_name}!</h1>
          <p>
            <Button type="primary">Invite</Button>
          </p>
          <p>
              <Link to="/login" onClick={logout}>Logout</Link>
          </p>
          <div className="col-lg-8 offset-lg-2">
          </div>
        </div>
    );
}

export { HomePage };