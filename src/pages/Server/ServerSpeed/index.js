import React, {Fragment, useEffect, useReducer, useState} from 'react';
import httpRequest from '../../../request';
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Line = ({number, data}) => {
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
    }
;

const initLine =
    {
        data: [],
        currentServerDomain: null
    };

const lineReducer = (state, action) => {
        switch (action.type) {
            case 'SET':
                return {...state, data: action.payload};
            case 'SET_CURRENT':
                const {newData, currentServerDomain} = action.payload;
                const servers = state.data.map(server => {
                    if (server.domain === newData.domain) {
                        return {...newData};
                    } else {
                        return server;
                    }
                }).sort((a, b) => {
                    return a.delta - b.delta;
                });
                return {...state, currentServerDomain, data: servers};
            default:
                return state;
        }

    }
;

const ServerSpeed = (props) => {
        const [servers, setServers] = useState(props.data);
        const [lines, lineDispatch] = useReducer(lineReducer, initLine);

        const [isLoading, setIsLoading] = useState(false);

        const getServerInfo = async (server) => {
            try {
                const deltas = [];
                const cpt = 1;
                for (let i = 0; i < 5; i++) {
                    const date1 = new Date();
                    await httpRequest.get(server.url);
                    const date2 = new Date();
                    const delta = date2 - date1;
                    deltas.push(delta);
                    const newData = {...server, delta, isFinish: (cpt + i) === 5, message: `检测第 ${cpt + i}/5`};
                    lineDispatch({
                        type: 'SET_CURRENT', payload: {
                            currentServerDomain: server.domain,
                            newData
                        }
                    });
                }
                return {...server, delta: Math.min(...deltas)};
            } catch (e) {
                return {...server, delta: 9999};
            }
        };

        const fetchData = async () => {
            const tables = [];
            for (const server of servers) {
                tables.push(await getServerInfo(server));
            }
        };

        useEffect(() => {
            // setIsLoading(true);
            // fetchData().then(r => {setIsLoading(false);});
            lineDispatch({type: 'SET', payload: servers});
        }, []);

        const btnRefreshHandler = () => {
            setIsLoading(true);
            fetchData().then(r => {setIsLoading(false);});
        };
        return (
            <Fragment>
                <button className={'btn btn-primary'}
                        onClick={btnRefreshHandler}
                        disabled={isLoading}>
                    <FontAwesomeIcon icon={faSyncAlt} spin={isLoading}/> 重新测试
                </button>

                <table className="table" style={{marginTop: '20px'}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>节点国家</th>
                        <th>节点描述</th>
                        <th>状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        lines.data.map((data, index) => {
                            return (
                                <tr key={data.domain}>
                                    <Line number={index + 1} data={data}/>
                                </tr>
                            );
                        })
                    }
                    </tbody>

                </table>
            </Fragment>
        );
    }
;

export default ServerSpeed;
