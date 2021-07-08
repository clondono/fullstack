import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography, Form, Input } from 'antd'
import { LockOutlined } from '@ant-design/icons'

import { alertActions, authActions } from '../../actions'
import { usersApis } from '../../apis'

function PasswordSection() {
  const dispatch = useDispatch()
  type TODOReduxState = any
  interface UpdateUserPasswordApiParams {
    user_id: string
    old_password: string
    new_password: string
    new_password_confirm: string
  }
  const { user } = useSelector((state: TODOReduxState) => state.auth)
  const [formErrorMsg, setFormErrorMsg] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false)

  function onFinish(params: UpdateUserPasswordApiParams) {
    setFormErrorMsg('')
    setConfirmLoading(true)
    usersApis.updatePassword(params).then(({ error }: { error: { message: string } }) => {
      setConfirmLoading(false)
      if (error) {
        setFormErrorMsg(error.message)
      } else {
        dispatch(authActions.fetchProfile())
        dispatch(alertActions.success('Password updated.'))
      }
    })
  }

  return (
    <div>
      <h2>Update Password</h2>
      <Form name='updatePassword' onFinish={onFinish} initialValues={{ ...user }} size='large'>
        <Form.Item style={{ display: 'none' }} label='User Id' name='user_id' />
        <Form.Item
          label='Old Password'
          name='password'
          rules={[{ required: true, message: 'Please input old password!' }]}
        >
          <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} />
        </Form.Item>
        <Form.Item
          label='New Password'
          name='new_password'
          rules={[{ required: true, message: 'Please input a new password!' }]}
        >
          <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} />
        </Form.Item>
        <Form.Item
          label='Confirm New Password'
          name='new_password_confirm'
          rules={[{ required: true, message: 'Confirm your new password!' }]}
        >
          <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} />
        </Form.Item>

        <div>
          <Typography.Text type='danger'>{formErrorMsg}</Typography.Text>
        </div>
        <div className='textAlignRightContainer'>
          <Button type='primary' htmlType='submit' loading={confirmLoading}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  )
}

export { PasswordSection }
