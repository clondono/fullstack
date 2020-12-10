/* @flow */

const KoaRouter  = require('koa-router');


const Auth = require('./auth/index.js')
const Moderation = require('./moderation/index.js')
const router: any = new KoaRouter();

router.prefix("/api")


router.use(Auth.routes());
router.use(Moderation.routes());

module.exports = router ;
