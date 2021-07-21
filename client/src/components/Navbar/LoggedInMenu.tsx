import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../actions";
import { getUserDisplayName } from "../../utils";
import { InviteModal } from "./InviteModal";
import styles from "./Navbar.module.scss";

function LoggedInMenu() {
  type TODOReduxState = any;

  const user = useSelector((store: TODOReduxState) => store.auth.user);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
  };

  const menu = (
    <Menu>
      {/* <Menu.Item
        key="1"
        onClick={() => {setShowInviteModal(!showInviteModal)}}
        // className={styles.whiteText}
      >
        Invite
      </Menu.Item> */}
      <Menu.Item key="2">
        <Link
          to="/settings"
          // className={styles.whiteText}
        >
          Settings
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/login" onClick={logout} className={styles.navbarLink}>
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <InviteModal
        isVisible={showInviteModal}
        setIsVisible={setShowInviteModal}
      />
      <Dropdown
        className={styles.rightContainer}
        overlay={menu}
        trigger={["click"]}
      >
        <div>
          <span className={[styles.userName, styles.whiteText].join(" ")}>
            {getUserDisplayName(user)}
          </span>
          <CaretDownOutlined />
        </div>
      </Dropdown>
    </>
  );
}

export { LoggedInMenu };
