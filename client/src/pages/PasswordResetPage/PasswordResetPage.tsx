import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Typography, Form, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import useQueryString from '../../utils/useQueryString';
import { authActions } from '../../actions';
import { authApis } from '../../apis';

function PasswordResetPage() {
  const dispatch = useDispatch();

  const [formErrorMsg, setFormErrorMsg] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [token] = useQueryString('token');
  const [email] = useQueryString('email');
  const [user_id] = useQueryString('user_id');

  type ResetPasswordParams = {
    user_id: string;
    email: string;
    token: string;
    new_password: string;
    new_password_confirm: string;
  };

  function onFinish(values: ResetPasswordParams) {
    setFormErrorMsg('');
    setConfirmLoading(true);
    setFormErrorMsg('');
    authApis.passwordReset(values).then(({ error }: { error: { message: string } }) => {
      setConfirmLoading(false);
      if (error) {
        setFormErrorMsg(error.message);
      } else {
        dispatch(authActions.fetchProfile());
      }
    });
  }

  return (
    <div>
      <h2>Password Reset</h2>
      <Form name='passwordReset' onFinish={onFinish} initialValues={{ user_id, token, email }} size='large'>
        <Form.Item style={{ display: 'none' }} label='Token' name='token' />
        <Form.Item style={{ display: 'none' }} label='user Id' name='user_id' />
        <Form.Item
          label='Email'
          name='email'
          hidden={true}
          rules={[{ required: true, message: 'Please input a password!' }]}
        >
          <Input prefix={<MailOutlined className='site-form-item-icon' />} disabled />
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
            Reset Password
          </Button>
        </div>
      </Form>
    </div>
  );
}

export { PasswordResetPage };
