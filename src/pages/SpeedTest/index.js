import React, {Fragment, useEffect, useReducer} from 'react';
import httpRequest from '../../request';
import Spinner from '../../widget/Spinner';
import ServerSpeed from './ServerSpeed';
import Footer from '../../components/Footer';
// const ServerSpeed = lazy(() => import('./ServerSpeed'));

const initServers = {
    isLoading: true,
    data: []
};

const serverConstants = {
    SET: 'SET',
    LOADING: 'LOADING',
    RESET: 'RESET'
};

const serversReducer = (state, action) => {
    switch (action.type) {
        case serverConstants.LOADING:
            return {...state, isLoading: true};
        case serverConstants.SET:
            return {...state, data: action.payload, isLoading: false};
        default:
            return state;
    }
};

const SpeedTest = () => {
    // console.log("SpeedTest Render");

    const [servers, serversDispatch] = useReducer(serversReducer, initServers);

    useEffect(() => {
        let mounted = true;
        const cancelToken = httpRequest.CancelToken.source();

        httpRequest.get('/api/servers').then(response => {
            mounted && serversDispatch({type: serverConstants.SET, payload: response.data});
        }).catch((e) => {console.log(e.message);});

        return () => {
            cancelToken.cancel('取消请求');
        };
    }, []);

    return (
        <Fragment>
            <h3>服务器列表</h3>
            {servers.isLoading && <Spinner/>}
            <div style={{marginTop: '20px'}}>
                {!servers.isLoading && <ServerSpeed {...servers}/>}
            </div>
            <Footer/>
        </Fragment>
    );
};

export default SpeedTest;
