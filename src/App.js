import React, {Suspense} from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer';
import Spinner from './widget/Spinner';
import {lazy} from '@loadable/component';

const Home = lazy(() => import('./pages/Home'));
const Help = lazy(() => import('./pages/Help'));
const Server = lazy(() => import('./pages/Server'));

const App = () => {
    return (
        <Router>
            <Navbar/>
            <div style={{marginTop: '-10px'}}>
                <Suspense fallback={<Spinner/>}>
                    <Route path="/" component={Home} exact/>
                    <Route path="/help" component={Help} exact/>
                    <Route path="/server" component={Server} exact/>
                    <Redirect to="/"/>
                </Suspense>
            </div>
            <Footer/>
        </Router>
    );
};

export default App;
