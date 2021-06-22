import KoaRouter from 'koa-router';
import RequestSetter from '../middlewares/requestSetter';
import UpdatePassword from './updatePassword';
import UpdatePersonalDetails from './updatePersonalDetails';

const router: any = new KoaRouter();
router.prefix('/users');

router.put(
  '/:user_id/updatePassword',
  RequestSetter,
  UpdatePassword.validateParams,
  UpdatePassword.route
);
router.put(
  '/:user_id/updatePersonalDetails',
  RequestSetter,
  UpdatePersonalDetails.validateParams,
  UpdatePersonalDetails.route
);
router.put(
  '/:user_id/updateGridSettings',
  RequestSetter,
  UpdateGridSettings.validateParams,
  UpdateGridSettings.route
);

export default router;
