import KoaRouter from 'koa-router';
import RequestSetter from '../middlewares/requestSetter';
import FetchProfile from './fetchProfile';
import Invite from './invite';
import Login from './login';
import Logout from './logout';
import PasswordReset from './passwordReset';
import RequestPasswordReset from './requestPasswordReset';
import Signup from './signup';

const router: any = new KoaRouter();

router.prefix('/auth');

router.get('/fetchProfile', RequestSetter, FetchProfile.route);
router.post('/login', RequestSetter, Login.validateParams, Login.route);
router.delete('/logout', RequestSetter, Logout.route);

router.post('/invite', RequestSetter, Invite.validateParams, Invite.route);
router.post('/signup', RequestSetter, Signup.validateParams, Signup.route);
router.post('/requestPasswordReset', RequestSetter, RequestPasswordReset.validateParams, RequestPasswordReset.route);
router.post('/passwordReset', RequestSetter, PasswordReset.validateParams, PasswordReset.route);

export default router;
