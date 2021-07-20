import React, {useEffect, useReducer, useRef} from 'react';
import ServerCard from './ServerCard';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import mqtt from 'mqtt';

const initMetric = {
    data: []
};

const METRIC_CONSTANTS = {
    SET_MESSAGE: 'SET_MESSAGE'
};

const metricReducer = (state, action) => {
    switch (action.type) {
        case METRIC_CONSTANTS.SET_MESSAGE:
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
    const client = useRef(null);
    const isMountedRef = useIsMountedRef();
    const [metric, metricDispatch] = useReducer(metricReducer, {...initMetric, data: props.data}, undefined);

    useEffect(() => {
        client.current = mqtt.connect('wss://mqtt.qfdk.me/mqtt');
        client.current.on('connect', () => {
            console.log('订阅服务器连接成功');
            // 订阅事件
            for (const server of props.data) {
                client.current.subscribe(server.domain, {qos: 0}, (error) => {
                    if (error) {
                        console.log(`${server.domain} 订阅失败!`);
                    }
                });
            }
        });
        client.current.on('error', (err) => {
            console.error('连接错误: ', err);
        });
        client.current.on('reconnect', () => {
            console.log('重新连接成功');
        });
        client.current.on('message', (topic, message) => {
            isMountedRef.current && metricDispatch({
                type: METRIC_CONSTANTS.SET_MESSAGE,
                payload: {topic, ...JSON.parse(message.toString())}
            });
        });
        return () => {
            client.current.end(() => {
                console.log('MQTT client 关闭!');
            });
        };
    }, [isMountedRef, props.data]);

    return (
        <div className="row">
            {
                metric.data.map(s => <ServerCard key={s.domain} {...s} />)
            }
        </div>
    );
};

export default React.memo(ServerMetric);
