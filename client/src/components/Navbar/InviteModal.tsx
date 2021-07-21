import { useState } from "react";
import { Typography, Button, Modal, Form, Input } from "antd";

import { authApis } from "../../apis";

interface InviteModalProps {
  isVisible: boolean;
  setIsVisible: any;
}

function InviteModal(Props: InviteModalProps) {
  const { isVisible, setIsVisible } = Props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formErrorMsg, setFormErrorMsg] = useState<string | undefined>(
    undefined
  );

  const submitInvite = (params: { email: string }) => {
    setFormErrorMsg(undefined);
    setConfirmLoading(true);
    authApis
      .invite(params)
      .then(({ error }: { error: { message: string } }) => {
        setConfirmLoading(false);
        if (error) {
          setFormErrorMsg(error.message);
        } else {
          setIsVisible(false);
        }
      });
  };

  return (
    <Modal
      title="Invite"
      confirmLoading={confirmLoading}
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
    >
      <Form
        name="invite"
        onFinish={submitInvite}
        // initialValues={{}}
        size="large"
      >
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
            Invite
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
export { InviteModal };
