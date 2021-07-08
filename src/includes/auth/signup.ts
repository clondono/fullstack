import _ from 'lodash'
import Config from '../../config'
import PgQuery from '../clients/pg'
import CustomError from '../error/customError'
import ErrorOptions from '../error/errorOptions'
import UsersCreate from '../users/create'

const INVITES_TABLE = Config.POSTGRES.TABLES.USERS.INVITES
const validateInvite = async ({ email, token }: { email: string; token: string }) => {
  const query_match = `SELECT token from ${INVITES_TABLE} WHERE email=$/email/ AND token=$/token/ AND NOT used`
  const bindings_match = { email, token }
  const match = await PgQuery.query([{ query: query_match, bindings: bindings_match }])
  if (_.isEmpty(match)) {
    // this token either doesn't exist, is already used, or this email token pairing isn't valid
    throw new CustomError(ErrorOptions.POSTGRES)
  }
  return true
}

const isValidEmailForSignup = async ({ email }: { email: string }) => {
  const USER_EXISTS_QUERY = 'SELECT * FROM users WHERE email=$/email/'
  const bindings = { email }
  const rows = await PgQuery.query([{ query: USER_EXISTS_QUERY, bindings: bindings }])
  if (!_.isEmpty(rows)) {
    throw new CustomError(ErrorOptions.EXISTING_EMAIL)
  }
  return true
}
const signup = async ({
  email,
  token,
  password,
  password_confirm,
  first_name,
  last_name,
  company,
}: {
  email: string
  token: string
  password: string
  password_confirm: string
  first_name?: string
  last_name?: string
  company?: string
}) => {
  await validateInvite({ email, token })
  await isValidEmailForSignup({ email })
  if (password != password_confirm) {
    throw new CustomError(ErrorOptions.PASSWORDS_MISMATCH)
  }
  const user = await UsersCreate.create({ email, password, first_name, last_name, company })
  await PgQuery.query([
    {
      query: `UPDATE ${INVITES_TABLE} SET used=TRUE WHERE email=$/email/ AND token=$/token/`,
      bindings: {
        email,
        token,
      },
    },
  ])
  return user
}

export default {
  signup,
}
