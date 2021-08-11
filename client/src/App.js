import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Expenses from './pages/Expenses';
import Dashboard from './pages/Dashboard';
import TripPlanner from './pages/Wishlist';
import SingleEntry from './pages/SingleEntry';


const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

function App() {
    return (
      <ApolloProvider client={client}>
      <Router>
      <Navbar />
     <Switch>
   <Route exact path="/">
     <Home />
   </Route>
   <Route path="/dashboard">
     <Dashboard />
   </Route>
   <Route path="/tripplanner">
     <TripPlanner />
   </Route>
   <Route path="/expenses">
     <Expenses />
   </Route>
   <Route path="/thoughts/:thoughtId">
     <SingleEntry />
   </Route>
   <Footer />
 </Switch>
 </Router>
       </ApolloProvider>
    );
}

export default App;