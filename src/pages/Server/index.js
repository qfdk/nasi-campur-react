import React, {useEffect, useReducer, useState} from 'react';
import httpRequest from '../../request';
import Spinner from '../../widget/Spinner';
import ServerMetric from './ServerMetric';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartBar, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import ServerSpeed from './ServerSpeed';

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

const PAGE_TYPE = {
    METRIC: 'metric',
    SPEED_TEST: 'speed_test'
};

const disabledBtn = (pageType, currentType) => {
    return pageType === currentType;
};

const Server = () => {
    const [servers, serversDispatch] = useReducer(serversReducer, initServers);
    const [type, setType] = useState(PAGE_TYPE.METRIC);

    useEffect(() => {
        httpRequest.get('/api/servers').then(response => {
            serversDispatch({type: serverConstants.SET, payload: response.data});
        });
    }, []);

    return (
        <div className="container">
            <h3>服务器列表</h3>

            <div className={'btn-group'}>
                <button className={'btn btn-primary'}
                        onClick={() => setType(PAGE_TYPE.METRIC)}
                        disabled={disabledBtn(PAGE_TYPE.METRIC, type)}>
                    <FontAwesomeIcon icon={faChartBar}/> 状态检测
                </button>

                <button className={'btn btn-primary'}
                        onClick={() => setType(PAGE_TYPE.SPEED_TEST)}
                        disabled={disabledBtn(PAGE_TYPE.SPEED_TEST, type)}>
                    <FontAwesomeIcon icon={faTachometerAlt}/> 测速
                </button>
            </div>

            {servers.isLoading && <Spinner/>}
            <div style={{marginTop: '20px'}}>
                {!servers.isLoading && PAGE_TYPE.METRIC === type && <ServerMetric {...servers}/>}
                {!servers.isLoading && PAGE_TYPE.SPEED_TEST === type && <ServerSpeed {...servers}/>}
            </div>

        </div>
    );
};

export default Server;
