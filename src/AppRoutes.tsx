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
          <Route component={AdScreen} path={`${ROUTE_AD}/:id`} />
          <Route component={PostScreen} path={`${ROUTE_POST}/:postId`} />
          <Route component={SearchScreen} path={ROUTE_SEARCH} />
          <Route component={AllProductsScreen} path={ROUTE_ALL_PRODUCTS} />
          <Route component={AllPostsScreen} path={ROUTE_ALL_POSTS} />
          <PrivateRoute component={ProfileScreen} path={ROUTE_PROFILE} />
          <Route component={FourOhFourScreen} />
          {/* <PrivateRoute component={CreateAdScreen} path={ROUTES.CREATE_AD} /> */}
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
