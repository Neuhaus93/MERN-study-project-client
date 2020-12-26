import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './AppRoutes';
import { cache } from './cache';
import { AuthProvider } from './contexts/auth-context';
import './index.css';
import { setContext } from '@apollo/client/link/context';

const uri = process.env.REACT_APP_API_URL;

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('@token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  connectToDevTools: true,
});

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
