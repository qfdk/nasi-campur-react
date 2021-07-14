import React, {Suspense} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer';
import Spinner from './widget/Spinner';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Help = React.lazy(() => import('./pages/Help/Help'));
const Server = React.lazy(() => import('./pages/Server/Server'));

const App = () => {
    return (
        <Router>
            <Navbar/>
            <div style={{marginTop: '-10px'}}>
                <Suspense fallback={<Spinner/>}>
                    <Switch>
                        <Route path="/" exact>
                            <Home/>
                        </Route>
                        <Route path="/help" component={Help} exact/>
                        <Route path="/server" component={Server} exact/>
                        <Redirect to="/"/>
                    </Switch>
                </Suspense>
            </div>
            <Footer/>
        </Router>
    );
};

export default App;
