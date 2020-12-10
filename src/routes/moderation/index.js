//@flow
"use strict";

const KoaRouter  = require('koa-router');

const RequestSetter = require("../middlewares/requestSetter.js");
const SubmitData = require('./submitData');
const LabelData = require('./labelData');
const LabelOptions = require('./getLabelOptions');
const GetUnlabeled = require('./getUnlabeled');

const router: any = new KoaRouter();
router.prefix("/moderation");

router.post("/submitData", RequestSetter, SubmitData);
router.get("/getAllUnlabeled", RequestSetter, GetUnlabeled);
router.post("/:image_id/labelData", RequestSetter,  LabelData);
router.get("/getLabelOptions", RequestSetter,  LabelOptions);

module.exports = router;
