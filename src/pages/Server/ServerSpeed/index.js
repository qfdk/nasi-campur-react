import React, {Fragment, useEffect, useState} from 'react';
import httpRequest from '../../../request';
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const getServerInfo = async (server) => {
    try {
        const deltas = [];
        for (let i = 0; i < 3; i++) {
            const date1 = new Date();
            await httpRequest.get(server.url);
            const date2 = new Date();
            deltas.push(date2 - date1);
        }
        return {...server, delta: Math.min(...deltas)};
    } catch (e) {
        return {...server, delta: 999};
    }
};

const ServerSpeed = (props) => {
    const [servers, setServers] = useState(props.data);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        const tables = [];
        for (const server of servers) {
            tables.push(await getServerInfo(server));
        }
        const newServers = tables.sort((a, b) => {
            return a.delta - b.delta;
        });
        setServers(newServers);
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData().then(r => {setIsLoading(false);});
    }, []);

    const btnRefreshHandler = () => {
        setIsLoading(true);
        fetchData().then(r => {setIsLoading(false);});
    };
    return (
        <Fragment>
            <button className={'btn btn-primary'}
                    onClick={btnRefreshHandler}
                    disabled={isLoading}
            >
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
                    servers.map((data, index) => {
                        return (
                            <tr key={data.domain}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.country}</td>
                                <td>{data.description}</td>
                                <td className={(data.delta === 999 || data.delta === '-')
                                    ? 'danger'
                                    : null}>{data.delta === 999 || data.delta === '-' ? '节点出错' : data.delta +
                                    ' ms'}</td>
                            </tr>
                        );
                    })
                }
                </tbody>

            </table>
        </Fragment>
    );
};

export default ServerSpeed;
