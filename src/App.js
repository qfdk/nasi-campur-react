import React, {Fragment, lazy, Suspense, useEffect, useMemo} from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Spinner from './widget/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'

const Home = lazy(() => import('./pages/Home'));
const Help = lazy(() => import('./pages/Help'));
const Server = lazy(() => import('./pages/ServerMetric'));
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

    const styleBody = useMemo(() => {
        return {marginTop: '65px'};
    }, []);

    return (
        <Fragment>
            <Router>
                <Navbar/>
                <div style={styleBody}>
                    <Suspense fallback={<Spinner/>}>
                        <Route path="/" component={Home} exact/>
                        <Route path="/help" component={Help} exact/>
                        <Route path="/servers" component={Server} exact/>
                        <Route path="/speed-test" component={SpeedTest} exact/>
                        <Redirect to="/"/>
                    </Suspense>
                </div>
            </Router>
            <Footer/>
        </Fragment>
    );
};

export default App;
