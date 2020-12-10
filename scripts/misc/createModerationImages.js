 'use strict';
 
 const ModerationImageCreate = require('../../server/includes/moderationImages/create');

const main = async() => {

  const created_image_1 = await ModerationImageCreate.createModerationImage({
      s3_key:'image/5dcd005f5261a1315cca88df124afd19',
      metadata: {
        test: 'true'
      }
  });
  const created_image_2 = await ModerationImageCreate.createModerationImage({
      s3_key:'image/69bcb58656869512d4c8568c6b676495',
      metadata: {
        test: 'true'
      }
  });
  const created_image_3 = await ModerationImageCreate.createModerationImage({
      s3_key:'image/52aa9aa247ea8a720b359df4d4820dbd',
      metadata: {
        test: 'true'
      }
  });
  const created_image_4 = await ModerationImageCreate.createModerationImage({
      s3_key:'image/2ddee22bbda281c32a2b6105122e98a7',
      metadata: {
        test: 'true'
      }
  });
  const created_image_5 = await ModerationImageCreate.createModerationImage({
      s3_key:'image/37ec673f68dd9aef47386ba9c7b1bcd2',
      metadata: {
        test: 'true'
      }
  });
  console.log({created_image_1})
  console.log({created_image_2})
  console.log({created_image_3})
  console.log({created_image_4})
  console.log({created_image_5})

  process.exit(0);
}

main();