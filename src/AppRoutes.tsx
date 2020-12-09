import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AdScreen } from './pages/AdScreen';
import { HomeScreen } from './pages/HomeScreen';
import { LoginScreen } from './pages/LoginScreen';
import { ROUTE_AD, ROUTE_LANDING, ROUTE_LOGIN } from './util/routes';

export const App: React.FC = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route component={HomeScreen} path={ROUTE_LANDING} exact />
          <Route component={LoginScreen} path={`${ROUTE_LOGIN}/:lastPath?`} />
          <Route component={AdScreen} path={`${ROUTE_AD}/:id`} />
          {/* <AuthRoute component={RegisterScreen} path={ROUTES.REGISTER} />
          <PrivateRoute component={CreateAdScreen} path={ROUTES.CREATE_AD} />
          <PrivateRoute component={ProfileContainer} path={ROUTES.PROFILE} />
          <Route component={PostScreen} path={`${ROUTES.POST}/:id`} />
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

// interface AuthRouteProps extends RouteProps {
//   // tslint:disable-next-line:no-any
//   component: any;
// }

// const AuthRoute = (props: AuthRouteProps) => {
//   const { component: Component, ...rest } = props;
//   const { currentUser } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(routeProps) =>
//         currentUser ? <Redirect to={LANDING} /> : <Component {...routeProps} />
//       }
//     />
//   );
// };
