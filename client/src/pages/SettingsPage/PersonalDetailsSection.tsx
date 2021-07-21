import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Form, Input } from "antd";

import { authActions, alertActions } from "../../actions";
import { usersApis } from "../../apis";

function PersonalDetailsSection() {
  const dispatch = useDispatch();
  type TODOReduxState = any;
  type UpdateUserApiParams = {
    user_id: string;
    first_name?: string;
    last_name?: string;
    company?: string;
  };

  const { user } = useSelector((state: TODOReduxState) => state.auth);

  const [formErrorMsg, setFormErrorMsg] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  function onFinish(values: UpdateUserApiParams) {
    setFormErrorMsg("");
    setConfirmLoading(true);
    usersApis.updatePersonalDetails(values).then(({ error }) => {
      setConfirmLoading(false);
      if (error) {
        setFormErrorMsg(error.message);
      } else {
        dispatch(authActions.fetchProfile());
        dispatch(alertActions.success("Personal Settings updated."));
      }
    });
  }

  return (
    <div>
      <h2>Update Personal Details</h2>
      <Form
        name="updatePersonalDetails"
        onFinish={onFinish}
        initialValues={{ ...user }}
        size="large"
      >
        <Form.Item style={{ display: "none" }} label="User Id" name="user_id" />
        <Form.Item label="First Name" name="first_name">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="last_name">
          <Input />
        </Form.Item>
        <Form.Item label="Company name" name="company">
          <Input />
        </Form.Item>
        <div>
          <Typography.Text type="danger">{formErrorMsg}</Typography.Text>
        </div>
        <div className="textAlignRightContainer">
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}

export { PersonalDetailsSection };
