import React, {useEffect, useReducer, useState} from 'react';
import ServerCard from './ServerCard';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import mqtt from 'mqtt';

const initMetric = {
    isLoading: false,
    data: []
};

const serverConstants = {
    SET: 'SET',
    LOADING: 'LOADING',
    RESET: 'RESET',
    SET_MESSAGE: 'SET_MESSAGE'
};

const metricReducer = (state, action) => {
    switch (action.type) {
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

const ServerMetric = (props) => {
    const {data} = props;
    const [client, setClient] = useState(null);
    const [metric, metricDispatch] = useReducer(metricReducer, {...initMetric, data}, undefined);
    const isMountedRef = useIsMountedRef();

    const mqttSub = (topic) => {
        if (client) {
            // console.log(`订阅主题 : ${topic}`);
            client.subscribe(topic, {qos: 0}, (error) => {
                if (error) {
                    console.log(`${topic} 订阅失败!`);
                }
            });
        }
    };

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                console.log('订阅服务器连接成功');
                // 订阅事件
                for (const server of metric.data) {
                    mqttSub(server.domain);
                }
            });
            client.on('error', (err) => {
                console.error('连接错误: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                console.log('重新连接成功');
            });
            client.on('message', (topic, message) => {
                isMountedRef.current && metricDispatch({
                    type: serverConstants.SET_MESSAGE,
                    payload: {topic, ...JSON.parse(message.toString())}
                });
            });
        }
        return () => {
            if (client) {
                client.end(() => {
                    console.log('MQTT client 关闭!');
                });
            }
        };
    }, [client]);

    useEffect(() => {
        isMountedRef.current = true;
        setClient(mqtt.connect('wss://mqtt.qfdk.me/mqtt'));
        return () => {
            isMountedRef.current = false;
        };
    }, [isMountedRef]);

    return (
        <div className="row">
            {
                metric.data.map(s => {
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
        </div>
    );
};

export default React.memo(ServerMetric);
