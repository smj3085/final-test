import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Home from './pages/Home';
import Expenses from './pages/Expenses';

const client = new ApolloClient({
    request: operation => {
        const token = localStorage.getItem('id_token');

        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        })
    },
    uri: '/graphql',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <>
                    <Navbar />
                    <Route exact path='/' component={Home} />
                    <Switch>
                        <Route exact path='/search' component={SearchBooks} />
                        <Route exact path='/saved' component={SavedBooks} />
                        <Route exact path='/expenses' component={Expenses} />
                    
                    </Switch>
                    <Footer />
                </>
            </Router>
        </ApolloProvider>
    );
}

export default App;