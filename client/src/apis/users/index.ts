import { executeRequest } from "../../utils";

async function updatePassword(params: any) {
  return executeRequest.PUT({
    url: `users/${params.user_id}/updatePassword`,
    body: {
      ...params,
    },
  });
}

async function updatePersonalDetails(params: any) {
  return executeRequest.PUT({
    url: `users/${params.user_id}/updatePersonalDetails`,
    body: {
      ...params,
    },
  });
}

export const usersApis = {
  updatePassword,
  updatePersonalDetails,
};
