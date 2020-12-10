import {executeRequest } from '../../utils'


async function getAllUnlabeled() {
    const { res, error } = await executeRequest.GET({ 
      url: 'moderation/getAllUnlabeled', 
      })
}
async function labelData({image_id, label_result}:{image_id: string, label_result: string}) {
    
    const { res, error } = await executeRequest.POST({ 
      url: `moderation/${image_id}/labelData`, 
      body: {
        image_id,
        label_result
      }
    })
}
async function getLabelOptions() {
  const { res, error } = await executeRequest.GET({ 
    url: 'moderation/getLabelOptions', 
    })
}


export const moderationApis = {
  getAllUnlabeled,
  getLabelOptions,
  labelData
}