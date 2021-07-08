import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Typography, Form, Input } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import useQueryString from '../../utils/useQueryString'
import { authActions } from '../../actions'
import { authApis } from '../../apis'
function SignupPage() {
  const dispatch = useDispatch()

  const [formErrorMsg, setFormErrorMsg] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [token] = useQueryString('token')
  const [email] = useQueryString('email')

  interface SignupParams {
    user_id: string
    email: string
    token: string
    first_name: string
    last_name: string
    password: string
    password_confirm: string
  }

  function onFinish(values: SignupParams) {
    setFormErrorMsg('')
    setConfirmLoading(true)
    setFormErrorMsg('')
    authApis.signup(values).then(({ error }: { error: { message: string } }) => {
      setConfirmLoading(false)
      if (error) {
        setFormErrorMsg(error.message)
      } else {
        dispatch(authActions.fetchProfile())
      }
    })
  }

  return (
    <div>
      <h2>Signup</h2>
      <Form name='signup' onFinish={onFinish} initialValues={{ token, email }} size='large'>
        <Form.Item style={{ display: 'none' }} label='Token' name='token' />
        <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input a password!' }]}>
          <Input prefix={<MailOutlined className='site-form-item-icon' />} disabled />
        </Form.Item>
        <Form.Item label='First Name' name='first_name'>
          <Input />
        </Form.Item>
        <Form.Item label='Last Name' name='last_name'>
          <Input />
        </Form.Item>
        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input a password!' }]}>
          <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} />
        </Form.Item>
        <Form.Item
          label='Confirm Password'
          name='password_confirm'
          rules={[{ required: true, message: 'Confirm your Password!' }]}
        >
          <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} />
        </Form.Item>

        <div>
          <Typography.Text type='danger'>{formErrorMsg}</Typography.Text>
        </div>
        <div className='textAlignRightContainer'>
          <Button type='primary' htmlType='submit' loading={confirmLoading}>
            submit
          </Button>
        </div>
      </Form>
    </div>
  )
}

export { SignupPage }
