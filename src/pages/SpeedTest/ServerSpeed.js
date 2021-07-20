import React, {Fragment, useEffect, useReducer, useRef, useState} from 'react';
import httpRequest from '../../request';
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FlipMove from 'react-flip-move';
import useIsMountedRef from '../../hooks/useIsMountedRef';

const N = 3;
const Line = React.memo(({number, data}) => {
    return (
        <Fragment>
            <th scope="row">{number}</th>
            <td>{data.country}</td>
            <td>{data.description}</td>
            <td className={(data.delta === 9999) ? 'danger' : null}>
                {data.isFinish ? `${data.delta} ms` : data.message}
            </td>
        </Fragment>
    );
});

const initLine =
    {
        data: [],
        currentServerDomain: null
    };

const lineReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return {...state, data: action.payload};
        case 'RESET':
            return {
                ...state,
                data: state.data.map(e => {return {...e, isFinish: false, message: '等待检测...', delta: '-'};})
            };
        case 'SET_CURRENT':
            const {newData, currentServerDomain} = action.payload;
            const servers = state.data.map(server =>
                server.domain === newData.domain ? {...newData} : server
            );
            return {
                ...state, currentServerDomain,
                data: [
                    ...servers.filter(s => s.isFinish)
                    .sort((a, b) => {
                        return a.delta - b.delta;
                    }),
                    ...servers.filter(s => !s.isFinish)]
            };
        default:
            return state;
    }

};

const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

const ServerSpeed = (props) => {
    const servers = props.data;
    const [lines, lineDispatch] = useReducer(lineReducer, {...initLine, data: servers});
    const [isLoading, setIsLoading] = useState(false);
    const isMountedRef = useIsMountedRef();
    const cancelTokenSource = useRef(null);

    const getServerInfo = async (server) => {
        let newData = null;
        try {
            const deltas = [];
            const cpt = 1;
            for (let i = 0; i < N; i++) {
                const date1 = new Date();
                await httpRequest.get(server.url, {cancelToken: cancelTokenSource.current.token});
                const date2 = new Date();
                const delta = date2 - date1;
                deltas.push(delta);
                newData = {...server, delta, isFinish: (cpt + i) === N, message: `检测第 ${cpt + i}/${N}`};
                await sleep(200);
            }
        } catch (e) {
            newData = {...server, message: e.message === 'Network Error' ? '网络错误' : e.message};
        } finally {
            isMountedRef.current && lineDispatch({
                type: 'SET_CURRENT', payload: {
                    currentServerDomain: server.domain,
                    newData
                }
            });
        }
    };

    const fetchData = async () => {
        lineDispatch({type: 'RESET'});
        cancelTokenSource.current = httpRequest.CancelToken.source();
        for (const server of servers) {
            await getServerInfo(server);
        }
        cancelTokenSource.current = null;
    };

    useEffect(() => {
        return () => {
            if (cancelTokenSource.current) {
                cancelTokenSource.current.cancel('用户停止操作');
            }
        };
    }, []);

    const btnRefreshHandler = async () => {
        isMountedRef.current && setIsLoading(true);
        await fetchData();
        isMountedRef.current && setIsLoading(false);
    };
    return (
        <Fragment>
            <button className={'btn btn-primary'}
                    onClick={btnRefreshHandler}
                    disabled={isLoading}>
                <FontAwesomeIcon icon={faSyncAlt} spin={isLoading}/> 响应测试
            </button>

            <table className="table" style={{marginTop: '20px'}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>节点国家</th>
                    <th>节点描述</th>
                    <th style={{width: '120px'}}>状态</th>
                </tr>
                </thead>
                <tbody style={{position: 'relative'}}>
                <FlipMove typeName={null}>
                    {
                        lines.data.map((data, index) => {
                            return (
                                <tr key={data.domain}>
                                    <Line number={index + 1} data={data}/>
                                </tr>
                            );
                        })
                    }
                </FlipMove>
                </tbody>
            </table>
        </Fragment>
    );
};

export default React.memo(ServerSpeed);
