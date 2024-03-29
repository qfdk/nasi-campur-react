import React, {lazy, Suspense, useEffect, useMemo} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Spinner from './widget/Spinner';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = lazy(() => import('./pages/Home'));
const Help = lazy(() => import('./pages/Help'));
const Server = lazy(() => import('./pages/ServerMetric'));
const SpeedTest = lazy(() => import('./pages/SpeedTest'));
const UserInfo = lazy(() => import('./pages/UserInfo'));
const IPCheck = lazy(() => import('./pages/IPCheck'));

const App = () => {
    useEffect(() => {
        const loading = document.getElementById('i-loading');
        if (loading) {
            setTimeout(() => {
                loading.setAttribute('class', 'i-loading-out');
                loading.style.display = 'none';
            }, 300);
        }
    }, []);

    const styleBody = useMemo(() => {
        return {marginTop: '65px'};
    }, []);

    return (
        <div className="container">
            <Router>
                <Navbar/>
                <div style={styleBody}>
                    <Suspense fallback={<Spinner/>}>
                        <Route path="/" component={Home} exact/>
                        <Route path="/help" component={Help} exact/>
                        <Route path="/servers" component={Server} exact/>
                        <Route path="/speed-test" component={SpeedTest} exact/>
                        <Route path="/search/:wechatName" component={UserInfo} exact/>
                        <Route path="/ip-check" component={IPCheck} exact/>
                        {/*<Redirect to="/"/>*/}
                    </Suspense>
                </div>
            </Router>
            <Footer/>
        </div>
    );
};

export default React.memo(App);
