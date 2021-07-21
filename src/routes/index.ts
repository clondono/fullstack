import KoaRouter from 'koa-router';
import Auth from './auth/index';
import Users from './users/index';

const router: any = new KoaRouter();

router.prefix('/api');

router.use(Auth.routes());
router.use(Users.routes());

export default router;
