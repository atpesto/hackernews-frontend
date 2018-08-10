import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const httpURI = 'http://localhost:4000';

const client = new ApolloClient({
  uri: httpURI,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
