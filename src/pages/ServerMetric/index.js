import React, {useEffect, useReducer} from 'react';
import httpRequest from '../../request';
import Spinner from '../../widget/Spinner';
import ServerMetric from './ServerMetric';

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


const Server = () => {
    const [servers, serversDispatch] = useReducer(serversReducer, initServers);

    useEffect(() => {
        httpRequest.get('/api/servers').then(response => {
            serversDispatch({type: serverConstants.SET, payload: response.data});
        });
    }, []);

    return (
        <div className="container">
            <h3>服务器列表</h3>
            {servers.isLoading && <Spinner/>}
            <div style={{marginTop: '20px'}}>
                {!servers.isLoading && <ServerMetric {...servers}/>}
            </div>
        </div>
    );
};

export default Server;
