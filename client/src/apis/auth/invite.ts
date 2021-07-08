import { executeRequest } from '../../utils'

function invite({ email }: { email: string }) {
  const body = { email }
  return executeRequest.POST({
    url: 'auth/invite',
    body,
  })
}

export { invite }
