import React, { useEffect, useState  } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd'

import Config from '../../config'
import { moderationApis, } from '../../apis'
import { authActions, } from '../../actions'

function HomePage(Props) {
    // const users = useSelector(state => state.users);
    const user = useSelector(store => store.auth.user);
    const [moderationImages,setModerationImages] = useState()
    const dispatch = useDispatch();
    const logout =  () => {
        dispatch(authActions.logout()); 
    }
    useEffect(() => {
      const fetchModerationImages = async () => {
        const moderationImages = await moderationApis.getAllUnlabeled();
        setModerationImages(moderationImages);
      };
      fetchModerationImages();
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
              
              {moderationImages &&
                  <ul>
                      {moderationImages.map((modImage, index) =>
                          <li key={modImage.image_id}>
                              modImage.image_url
                          </li>
                      )}
                  </ul>
              }
          </div>
        </div>
    );
}

export { HomePage };