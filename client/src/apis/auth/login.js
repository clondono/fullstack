import logout from './logout'
import {executeRequest } from '../../utils'
function login({email, password}:{email: string, password: string}) {
    const body = { email, password };
    return executeRequest.POST({ 
      url: 'auth/login', 
      body
      })
}
export {
  login
}