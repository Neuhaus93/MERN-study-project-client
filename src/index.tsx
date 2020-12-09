import { ApolloClient, ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './AppRoutes';
import { cache } from './cache';
import './index.css';

const uri = process.env.REACT_APP_API_URL;

// const uri =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:4000/'
//     : 'https://julianlist.herokuapp.com/';

const client = new ApolloClient({
  cache,
  uri,
  connectToDevTools: true,
});

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
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
