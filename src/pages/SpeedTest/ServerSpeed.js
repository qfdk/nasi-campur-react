import React, {Fragment, useEffect, useReducer, useRef, useState} from 'react';
import httpRequest from '../../request';
import FlipMove from 'react-flip-move';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import './spinner.css';

const N = 3;
const Line = React.memo(({number, data}) => {
    return (
        <Fragment>
            <th scope="row">{number}</th>
            <td>{data.country}</td>
            <td>{data.description}</td>
            <td className={data.error ? 'danger' : null}>
                {data.isFinish ? `${data.delta} ms` : data.message}
            </td>
        </Fragment>
    );
});

const initLine = {
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
                data: state.data.map(
                    e => {return {...e, isFinish: false, error: false, message: '等待检测...', delta: '-'};})
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
        try {
            const cpt = 1;
            for (let i = 0; i < N; i++) {
                const date1 = new Date();
                if (server.isInChina) {
                    await httpRequest.get(`/public/curl?url=${server.url}`,
                        {cancelToken: cancelTokenSource.current.token});
                } else {
                    await httpRequest.get(server.url, {cancelToken: cancelTokenSource.current.token});
                }
                const date2 = new Date();
                const delta = date2 - date1;
                if (isMountedRef.current) {
                    const newData = {
                        ...server,
                        delta,
                        error: false,
                        isFinish: (cpt + i) === N,
                        message: `检测第 ${cpt + i}/${N}`
                    };
                    lineDispatch({
                        type: 'SET_CURRENT', payload: {
                            currentServerDomain: server.domain,
                            newData
                        }
                    });
                }
                await sleep(100);
            }
        } catch (e) {
            console.log(e);
            if (isMountedRef.current) {
                const newData = {...server, error: true, message: e.message === 'Network Error' ? '网络错误' : e.message};
                lineDispatch({
                    type: 'SET_CURRENT', payload: {
                        currentServerDomain: server.domain,
                        newData
                    }
                });
            }
        }
    };

    const fetchData = async () => {
        lineDispatch({type: 'RESET'});
        cancelTokenSource.current = httpRequest.CancelToken.source();
        const table = [];
        for (const server of servers) {
            table.push(getServerInfo(server));
        }
        Promise.all(table).then(() => {
            cancelTokenSource.current = null;
        }).catch(e => {}).finally(() => {
            isMountedRef.current && setIsLoading(false);
        });
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
    };
    return (
        <Fragment>
            <button className={'btn btn-primary'}
                    onClick={btnRefreshHandler}
                    disabled={isLoading}>
                <span className={isLoading ? 'icon-loop2 loading-spinner spinner--steps' : 'icon-loop2'}></span> 响应测试
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
