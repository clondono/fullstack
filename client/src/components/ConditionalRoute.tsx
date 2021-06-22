import { Route, RouteProps, Redirect } from 'react-router-dom';

interface ConditionalRouteProps extends RouteProps {
  component: any;
  conditionMet: boolean;
  exact?: boolean;
  redirectPath: string;
}

function ConditionalRoute({
  component: Component,
  conditionMet,
  redirectPath,
  ...rest
}: ConditionalRouteProps) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!conditionMet) {
          // not logged in so redirect to login page with the return url
          return <Redirect to={{ pathname: redirectPath, state: { from: props.location } }} />;
        }
        // logged in so return component
        return <Component {...props} />;
      }}
    />
  );
}

export { ConditionalRoute };
