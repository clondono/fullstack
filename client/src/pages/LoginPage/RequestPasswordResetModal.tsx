import { useState } from "react";
import { Typography, Button, Modal, Form, Input } from "antd";
import { alertActions } from "../../actions";
import { useDispatch } from "react-redux";

import { authApis } from "../../apis";

interface RPRProps {
  isVisible: boolean;
  setIsVisible: any;
}
function RequestPasswordResetModal(Props: RPRProps) {
  const dispatch = useDispatch();
  const { isVisible, setIsVisible } = Props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formErrorMsg, setFormErrorMsg] = useState<string | undefined>(
    undefined
  );

  const submitResetPassword = ({ email }: { email: string }) => {
    setFormErrorMsg(undefined);
    setConfirmLoading(true);
    authApis
      .requestPasswordReset({ email })
      .then(({ error }: { error: { message: string } }) => {
        setConfirmLoading(false);
        if (error) {
          setFormErrorMsg(error.message);
        } else {
          setIsVisible(false);
          dispatch(
            alertActions.success(
              "Reset Password Link has been sent to your email."
            )
          );
        }
      });
  };

  return (
    <Modal
      title="Request Password Reset"
      confirmLoading={confirmLoading}
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
    >
      <Form name="passwordReset" onFinish={submitResetPassword} size="large">
        <Form.Item
          label="email"
          name="email"
          key="0"
          rules={[{ required: true, message: "Please input an email." }]}
        >
          <Input />
        </Form.Item>
        <div>
          <Typography.Text type="danger">{formErrorMsg}</Typography.Text>
        </div>
        <div className="textAlignRightContainer">
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            Request Reset Password
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
export { RequestPasswordResetModal };
