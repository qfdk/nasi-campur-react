import React, {Fragment, useEffect, useReducer, useState} from 'react';
import './server.css';
import httpRequest from '../../request';
import mqtt from 'mqtt';
import Spinner from '../../widget/Spinner';

const StaticInfo = React.memo(({cpu, network, type, os}) => {
    return (
        <Fragment>
            <div className="col-sm-12 inline"><label>CPU信息:</label>
                <span>{cpu ? cpu.model : ''}</span>
            </div>
            <div className="col-sm-12 inline"><label>系统信息:</label>
                <span>{type} {os}</span>
            </div>
            <div className="col-sm-12 inline"><label>流量使用:</label>
                {network && <span>上传 {network.rx_formatted} | 下载 {network.tx_formatted} </span>}
            </div>
        </Fragment>
    );
});

const ServerCard = React.memo((props) => {
    const {country, description, uptime, lastUpdateTime, cpu, network, type, os, disk, memory} = props;
    return (
        <div className="col-md-4">
            <div className="panel panel-success">
                <div className="panel-heading"><h3 className="panel-title">{country} - {description}</h3></div>
                <div className="panel-body">
                    <div className="row">
                        <StaticInfo cpu={cpu} network={network} type={type} os={os}/>
                        <div className="col-sm-12 inline"><label>在线时长:</label>
                            <span>{uptime}</span></div>
                        <div className="col-sm-12 inline"><label>最后更改 IP:</label>
                            <span>{lastUpdateTime}</span></div>
                        <div className="col-sm-12"><label className="usageLabel inline">CPU 使用率:</label>
                            {cpu && cpu.usage && <div className="usageProcess">
                                <div className="progress">
                                    <div className="progress-placeholder">CPU : {cpu.usage}%</div>
                                    <div className="progress-text">CPU : {cpu.usage}%</div>
                                    <div className="progress-bar progress-bar-info progress-bar-striped active"
                                         role="progressbar"
                                         style={{width: `${cpu.usage}%`}}></div>
                                </div>
                            </div>}
                        </div>
                        <div className="col-sm-12"><label className="usageLabel inline">RAM 使用率:</label>
                            {memory && <div className="usageProcess">
                                <div className="progress">
                                    <div className="progress-placeholder">RAM: {memory.current}/{memory.total}</div>
                                    <div className="progress-text">RAM: {memory.current}/{memory.total}</div>
                                    <div className="progress-bar progress-bar-info progress-bar-striped active"
                                         role="progressbar"
                                         style={{width: `${memory.usage}%`}}></div>
                                </div>
                            </div>}
                        </div>
                        <div className="col-sm-12"><label className="usageLabel inline">硬盘使用率:</label>
                            {disk && <div className="usageProcess">
                                <div className="progress">
                                    <div className="progress-placeholder">DISK: {disk.current}/{disk.total}</div>
                                    <div className="progress-text">DISK: {disk.current}/{disk.total}</div>
                                    <div className="progress-bar progress-bar-info progress-bar-striped active"
                                         role="progressbar"
                                         style={{width: `${disk.usage}%`}}></div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const initServer = {
    isLoading: false,
    data: []
};

const serverConstants = {
    SET: 'SET',
    LOADING: 'LOADING',
    RESET: 'RESET',
    SET_MESSAGE: 'SET_MESSAGE'
};

const serverReducer = (state, action) => {
    switch (action.type) {
        case serverConstants.LOADING:
            return {...state, isLoading: true};
        case serverConstants.SET:
            return {...state, data: action.payload, isLoading: false};
        case serverConstants.SET_MESSAGE:
            const updateState = {...state};
            const {topic} = action.payload;
            const server = state.data.find(s => s.domain === topic);
            if (server) {
                const index = state.data.indexOf(server);
                updateState.data[index] = {...server, ...action.payload};
            }
            return updateState;
        default:
            return state;
    }
};

const Server = () => {
    const [client, setClient] = useState(null);
    const [topics, setTopics] = useState([]);
    const [server, serverDispatch] = useReducer(serverReducer, initServer);

    const mqttConnect = (host, mqttOption) => {
        setClient(mqtt.connect(host, mqttOption));
    };

    const mqttSub = (topic) => {
        if (client) {
            // console.log('订阅主题');
            client.subscribe(topic, {qos: 0}, (error) => {
                if (error) {
                    // console.log('Subscribe to topics error', error);
                    return;
                }
            });
        }
    };

    useEffect(() => {
        serverDispatch({type: serverConstants.LOADING});
        httpRequest.get('/api/servers').then(response => {
            serverDispatch({type: serverConstants.SET, payload: response.data});
            setTopics(response.data);
        });
        return () => {
            // console.log('====组件消失了====');
        };
    }, []);

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                // console.log('订阅服务器连接成功');
            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                // console.log('重新连接成功');
            });
            client.on('message', (topic, message) => {
                serverDispatch({
                    type: serverConstants.SET_MESSAGE,
                    payload: {topic, ...JSON.parse(message.toString())}
                });
            });
        } else {
            mqttConnect('wss://mqtt.qfdk.me/mqtt');
        }
        return () => {
            if (client) {
                // console.log('MQTT client 要销毁了');
                client.end(() => {
                    // console.log('MQTT 务器关闭连接');
                });
            }
        };
    }, [client]);

    useEffect(() => {
        for (const topic of topics) {
            mqttSub(topic.domain);
        }
    }, [topics]);

    return (
        <div className="container">
            <h3>服务器列表</h3>
            {server.isLoading && <Spinner/>}
            {!server.isLoading && <div className="row">
                {
                    server.data.map(s => {
                            return <ServerCard key={s.domain}
                                               country={s.country}
                                               description={s.description}
                                               uptime={s.uptime}
                                               lastUpdateTime={s.lastUpdateTime}
                                               type={s.type}
                                               os={s.os}
                                               cpu={s.cpu}
                                               disk={s.disk}
                                               memory={s.memory}
                                               network={s.network}/>;
                        }
                    )
                }
            </div>}
        </div>
    );
};
export default React.memo(Server);
