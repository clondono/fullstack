//@flow
"use strict";

type SqlQueryParams = {
  query: string,
  bindings: any,
  is_error?: boolean,
};

const upload_enum = Object.freeze({
  IMAGE: "image",
  TEXT: "text",
  HSL: "hsl",
  CSV: "csv",
  MISC: "misc",
  VERSION: "version",
  AL: "active_learning",
  VF: "video_frame",
});

export type UploadType = $Values<typeof upload_enum>;


export type {
  SqlQueryParams
}