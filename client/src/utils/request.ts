import Config from "../config";

const apiUrl = Config.API_URL; //NOTE: we dont need the port since we store the localhost url
export const urlPrefix = apiUrl || `${window.location.origin}`; //isLocal && !apiUrl ? `http://localhost:${apiPort}` : (apiUrl || `${window.location.origin}`);
const isStatusCodeNonSuccess = (n: number) => Math.floor(n / 100) !== 2;

const apiCall = (
  requestMethod: string,
  { url, body }: { url: string; body: any }
) => {
  return fetch(`${urlPrefix}/api/${url}`, {
    method: requestMethod,
    credentials: "include",
    headers: new Headers({
      "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json",
    }),
    body: body ? JSON.stringify(body) : undefined,
  })
    .then((fetchResponse) => {
      if (fetchResponse.status === 204) {
        return { status: 204 };
      }
      return fetchResponse.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.status && isStatusCodeNonSuccess(jsonResponse.status)) {
        throw jsonResponse;
      }
      return jsonResponse;
    });
};
export type RequestMethods = "GET" | "POST" | "PUT" | "DELETE";

const REQUEST_METHODS: RequestMethods[] = ["GET", "POST", "PUT", "DELETE"];

let executeRequest: {
  [k in RequestMethods]?: any;
} = {};

REQUEST_METHODS.forEach((requestMethod: RequestMethods) => {
  executeRequest[requestMethod] = async (requestParams: any) => {
    const requestResponse = {
      res: null,
      error: null,
      didBail: false,
    };
    try {
      requestResponse.res = await apiCall(requestMethod, requestParams); //requestModule[requestMethod](requestParams);
    } catch (e) {
      console.log("caught api error", e);
      requestResponse.error = e;
    }
    return requestResponse;
  };
});

Object.freeze(executeRequest);
export { executeRequest };
