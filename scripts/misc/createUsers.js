 'use strict';
 
 const UsersCreate = require('../../server/includes/users/create');

const main = async() => {

  const created_user = await UsersCreate.createUser({
      email: 'christian@thehive.ai',
      password: 'test',
      first_name: 'christian',
      last_name: 'londoño',
      company: 'TheHive'
  });
  console.log({created_user})

  process.exit(0);
}

main();