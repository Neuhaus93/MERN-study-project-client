import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import { GlobalStyles } from 'twin.macro';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useAuth } from './hooks/useAuth';
import { AdScreen } from './pages/AdScreen';
import { AllPostsScreen } from './pages/AllPostsScreen';
import { AllProductsScreen } from './pages/AllProductsScreen';
import { CreateAdScreen } from './pages/CreateAdScreen';
import { CreatePostScreen } from './pages/CreatePostScreen';
import { EditAdScreen } from './pages/EditAdScreen';
import { ForgotPasswordScreen } from './pages/ForgotPasswordScreen';
import { FourOhFourScreen } from './pages/FourOhFour';
import { HomeScreen } from './pages/HomeScreen';
import { LoginScreen } from './pages/LoginScreen';
import { PostScreen } from './pages/PostScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { RegisterScreen } from './pages/RegisterScreen';
import { SearchScreen } from './pages/SearchScreen';
import {
  ROUTE_AD,
  ROUTE_ALL_POSTS,
  ROUTE_ALL_PRODUCTS,
  ROUTE_CREATE_AD,
  ROUTE_CREATE_POST,
  ROUTE_EDIT_AD,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_LANDING,
  ROUTE_LOGIN,
  ROUTE_POST,
  ROUTE_PROFILE,
  ROUTE_REGISTER,
  ROUTE_SEARCH,
} from './util/routes';

export const App: React.FC = () => {
  return (
    <div className='App'>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route component={HomeScreen} path={ROUTE_LANDING} exact />
          <AuthRoute
            component={LoginScreen}
            path={`${ROUTE_LOGIN}/:lastPath?`}
          />
          <AuthRoute component={RegisterScreen} path={ROUTE_REGISTER} />
          <AuthRoute
            component={ForgotPasswordScreen}
            path={ROUTE_FORGOT_PASSWORD}
          />
          <Route component={AdScreen} path={`${ROUTE_AD}/:id`} />
          <Route component={PostScreen} path={`${ROUTE_POST}/:postId`} />
          <Route component={SearchScreen} path={ROUTE_SEARCH} />
          <Route component={AllProductsScreen} path={ROUTE_ALL_PRODUCTS} />
          <Route component={AllPostsScreen} path={ROUTE_ALL_POSTS} />
          <PrivateRoute component={ProfileScreen} path={ROUTE_PROFILE} />
          <PrivateRoute component={CreateAdScreen} path={ROUTE_CREATE_AD} />
          <PrivateRoute component={CreatePostScreen} path={ROUTE_CREATE_POST} />
          <PrivateRoute
            component={EditAdScreen}
            path={`${ROUTE_EDIT_AD}/:productId`}
          />
          <Route component={FourOhFourScreen} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

interface CustomRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const AuthRoute = (props: CustomRouteProps) => {
  const { component: Component, ...rest } = props;
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <Redirect to={ROUTE_LANDING} />
        ) : (
          <Component {...routeProps} />
        )
      }
    />
  );
};

const PrivateRoute = (props: CustomRouteProps) => {
  const { component: Component, ...rest } = props;
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: ROUTE_LOGIN,
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};
