//@flow
"use strict";

const KoaRouter  = require('koa-router');

const RequestSetter = require("../middlewares/requestSetter.js");
const Login = require('./login');
const Invite = require('./invite');
const Logout = require('./logout');
const FetchProfile = require('./fetchProfile');
const Signup = require('./signup');

const router: any = new KoaRouter();


router.prefix("/auth");

router.get("/fetchProfile", RequestSetter, FetchProfile);
router.post("/login", RequestSetter, Login);
router.delete("/logout", RequestSetter, Logout);

router.post("/invite", RequestSetter, Invite);
router.post("/signup", RequestSetter, Signup);

module.exports = router;
