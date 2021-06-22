import MsAuthToken from '../../includes/honeypotModeration/authToken';

const main = async () => {
  const details = await MsAuthToken.getAuthTokenDetails();
  console.log(details);

  const token = await MsAuthToken.getAuthToken();
  console.log(token);
  const new_details = await MsAuthToken.getAuthTokenDetails();
  console.log(new_details);

  process.exit(0);
};

main();
