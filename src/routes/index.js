/* @flow */

const KoaRouter  = require('koa-router');


const Auth = require('./auth/index.js')
const router: any = new KoaRouter();

router.prefix("/api")


router.use(Auth.routes());

module.exports = router ;
