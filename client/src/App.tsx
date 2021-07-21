import { Alert, Col, Layout, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { alertActions, authActions } from "./actions";
import { ConditionalRoute, Navbar } from "./components";
import {
  HomePage,
  LoginPage,
  PasswordResetPage,
  SettingsPage,
  SignupPage,
} from "./pages";
import "./static/css/App.scss";
import { history } from "./utils";
import useQueryString from "./utils/useQueryString";

const { Header, Content, Footer } = Layout;
type TODOReduxState = any;

function App() {
  const dispatch = useDispatch();
  const [token] = useQueryString("token");
  const [email] = useQueryString("email");

  const { user, profile_loading } = useSelector(
    (state: TODOReduxState) => state.auth
  );
  const alert = useSelector((state: TODOReduxState) => state.alert);

  useEffect(() => {
    dispatch(authActions.fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    history.listen((_: any) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        {!profile_loading && (
          <Layout className="fullPage">
            <Header>
              <Navbar />
            </Header>
            <Content>
              {alert.message && (
                <>
                  <Alert
                    className={"alert"}
                    banner
                    closable
                    type={alert.type}
                    message={alert.message}
                  />
                </>
              )}
              <Row className="pageWidth mainContainer">
                <Col span={22} offset={1}>
                  <Switch>
                    {/* <ConditionalRoute
                    //TODO: add component for default page
                      exact
                      path='/'
                      conditionMet={!!user}
                      redirectPath='/login'
                      component={}
                    /> */}
                    <ConditionalRoute
                      exact
                      path="/home"
                      conditionMet={!!user}
                      redirectPath="/login"
                      component={HomePage}
                    />
                    <ConditionalRoute
                      path="/login"
                      conditionMet={!user}
                      redirectPath="/"
                      component={LoginPage}
                    />
                    <ConditionalRoute
                      path="/signup"
                      conditionMet={!user && !!token && !!email}
                      redirectPath="/"
                      component={SignupPage}
                    />
                    <ConditionalRoute
                      path="/passwordReset"
                      conditionMet={!user && !!token && !!email}
                      redirectPath="/"
                      component={PasswordResetPage}
                    />
                    <ConditionalRoute
                      exact
                      path="/Settings"
                      conditionMet={!!user}
                      redirectPath="/login"
                      component={SettingsPage}
                    />
                    <Redirect from="*" to="/" />
                  </Switch>
                </Col>
              </Row>
            </Content>
            <Footer />
          </Layout>
        )}
      </BrowserRouter>
    </>
  );
}

export { App };
