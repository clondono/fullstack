import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { LockOutlined } from '@ant-design/icons'

import { authActions } from '../../actions'
import { RequestPasswordResetModal } from './RequestPasswordResetModal'
import styles from './LoginPage.module.scss'

function LoginPage() {
  type TODOReduxState = any
  const dispatch = useDispatch()
  const auth = useSelector((state: TODOReduxState) => state.auth)
  const [showInviteModal, setShowInviteModal] = useState(false)

  function onFinish({ email, password }: { email: string; password: string }) {
    dispatch(authActions.login({ email, password }))
  }

  return (
    <div>
      <RequestPasswordResetModal isVisible={showInviteModal} setIsVisible={setShowInviteModal} />
      <h2>Login</h2>
      <Form name='login' onFinish={onFinish} size='large'>
        <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input an email.' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input a password.' }]}>
          <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} />
        </Form.Item>
        <div className='textAlignRightContainer'>
          <Link
            to='#'
            className={styles.requestPasswordReset}
            onClick={() => {
              setShowInviteModal(true)
            }}
          >
            Request Reset Password?
          </Link>
          <Button type='primary' htmlType='submit' loading={auth.loggingIn}>
            submit
          </Button>
        </div>
      </Form>
    </div>
  )
}

export { LoginPage }
