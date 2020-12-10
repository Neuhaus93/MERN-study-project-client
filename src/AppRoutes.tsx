import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useAuth } from './hooks/useAuth';
import { AdScreen } from './pages/AdScreen';
import { HomeScreen } from './pages/HomeScreen';
import { LoginScreen } from './pages/LoginScreen';
import { PostScreen } from './pages/PostScreen';
import {
  ROUTE_AD,
  ROUTE_LANDING,
  ROUTE_LOGIN,
  ROUTE_POST,
  ROUTE_REGISTER,
} from './util/routes';
import { GlobalStyles } from 'twin.macro';
import { RegisterScreen } from './pages/RegisterScreen';

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
          {/* <PrivateRoute component={CreateAdScreen} path={ROUTES.CREATE_AD} />
          <PrivateRoute component={ProfileContainer} path={ROUTES.PROFILE} />
          <Route component={SearchScreen} path={ROUTES.SEARCH} />
          <Route component={AllProductsScreen} path={ROUTES.ALL_PRODUCTS} />
          <Route component={AllPostsScreen} path={ROUTES.ALL_POSTS} />
          <Route component={FourOhFourScreen} /> */}
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

// const PrivateRoute = (props: CustomRouteProps) => {
//   const { component: Component, ...rest } = props;
//   const { currentUser } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(routeProps) =>
//         currentUser ? (
//           <Component {...routeProps} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: ROUTE_LOGIN,
//               state: { from: routeProps.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };
