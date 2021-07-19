import React, {Suspense, useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Spinner from './widget/Spinner';
import {lazy} from '@loadable/component';

const Home = lazy(() => import('./pages/Home'));
const Help = lazy(() => import('./pages/Help'));
const Server = lazy(() => import('./pages/Server'));
const SpeedTest = lazy(() => import('./pages/SpeedTest'));

const App = () => {
    useEffect(() => {
        const loading = document.getElementById('i-loading');
        if (loading) {
            loading.setAttribute('class', 'i-loading-out');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 200);
        }
    }, []);
    return (
        <Router>
            <Navbar/>
            <div style={{marginTop: '65px'}}>
                <Suspense fallback={<Spinner/>}>
                    <Route path="/" component={Home} exact/>
                    <Route path="/help" component={Help} exact/>
                    <Route path="/servers" component={Server} exact/>
                    <Route path="/speed-test" component={SpeedTest} exact/>
                    <Redirect to="/"/>
                </Suspense>
            </div>
            <Footer/>
        </Router>
    );
};

export default App;
