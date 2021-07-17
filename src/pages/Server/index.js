import React, {useEffect, useReducer, useState} from 'react';
import httpRequest from '../../request';
import mqtt from 'mqtt';
import Spinner from '../../widget/Spinner';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import ServerCard from './ServerCard';

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
    const isMountedRef = useIsMountedRef();

    const mqttConnect = (host, mqttOption) => {
        isMountedRef.current && setClient(mqtt.connect(host, mqttOption));
    };

    const mqttSub = (topic) => {
        if (client) {
            // console.log('订阅主题');
            client.subscribe(topic, {qos: 0}, (error) => {
                if (error) {
                    console.log(`${topic} 订阅失败!`);
                    return;
                }
            });
        }
    };

    useEffect(() => {
        serverDispatch({type: serverConstants.LOADING});
        httpRequest.get('/api/servers').then(response => {
            isMountedRef.current && serverDispatch({type: serverConstants.SET, payload: response.data});
            isMountedRef.current && setTopics(response.data);
        });
    }, []);

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                console.log('订阅服务器连接成功');
            });
            client.on('error', (err) => {
                console.error('连接错误: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                console.log('重新连接成功');
            });
            client.on('message', (topic, message) => {
                isMountedRef.current && serverDispatch({
                    type: serverConstants.SET_MESSAGE,
                    payload: {topic, ...JSON.parse(message.toString())}
                });
            });
        }
        return () => {
            if (client) {
                // console.log('MQTT client 要销毁了');
                client.end(() => {
                    console.log('MQTT client 关闭!');
                });
            }
        };
    }, [client]);

    useEffect(() => {
        if (!client)
            mqttConnect('wss://mqtt.qfdk.me/mqtt');
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
