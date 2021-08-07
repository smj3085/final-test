import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import SearchPlaces from './components/Wishlist/SearchWishlist';
import SavedPlaces from './components/Wishlist/SavedWishlist';
import Home from './pages/Home';
import Expenses from './pages/Expenses';
import Dashboard from './pages/Dashboard';
import AddNewEntryForm from './components/Dashboard/AddNewEntry';

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
                        <Route exact path='/dashboard' component={Dashboard} />
                        <Route exact path='/addnew' component={AddNewEntryForm} />
                        <Route exact path='/search' component={SearchPlaces} />
                        <Route exact path='/saved' component={SavedPlaces} />
                        <Route exact path='/expenses' component={Expenses} />
                        <Route exact path='/searchBooks' component={SearchBooks} />
                        <Route exact path='/savedBooks' component={SavedBooks} />

                    
                    </Switch>
                    <Footer />
                </>
            </Router>
        </ApolloProvider>
    );
}

export default App;