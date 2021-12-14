import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

/**
 * Интерфейс для ProtectedRoute.
 * @prop Component - компонент, на который происходит перенаправление при логине пользователя.
 * @prop props - все остальные пропсы этого компонента.
 */

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  [props: string]: any;
}

/**
 * ProtectedRoute - компонент с защищенным роутом.
 * Определяет залогинен ли пользователь, перенаправляя на нужный компонент или адрес.
 *
 * @prop Component - компонент, на который происходит перенаправление при логине пользователя.
 * @prop props - все остальные пропсы этого компонента.
 */
const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({
  component: Component,
  ...props
}) => {
  /**
   * Параметр статуса логина пользователя.
   */
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <Route>
      {isLoggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />}
    </Route>
  );
};

export default ProtectedRoute;
