import { executeRequest } from '../../utils'

function requestPasswordReset({ email }: { email: string }) {
  const body = { email }
  return executeRequest.POST({
    url: 'auth/requestPasswordReset',
    body,
  })
}

export { requestPasswordReset }
