//@flow
"use strict";

const Send = require("koa-send");

module.exports =  function(root: string, index: string, allow_list: RegExp[]): any {
  return async function (ctx: any, next: any): any {
    await next();

    if (allow_list.every((element) => element.test(ctx.path) === false)) {
      let path = ctx.path;
      if (/\.\w+$/.test(ctx.path) === false) {
        path = "index.html";
      }

      await Send(ctx, path, { root });
    }
  };
}

