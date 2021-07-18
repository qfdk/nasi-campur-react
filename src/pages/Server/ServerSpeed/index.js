import React, {useEffect, useState} from 'react';
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
        fetchData();
    }, []);

    return (
        <div className="table-responsive">
            <button className={'btn btn-primary'} onClick={fetchData}>
                <FontAwesomeIcon icon={faSyncAlt}/> 重新测试
            </button>
            <table className="table">
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
                                <th scope="row">{index}</th>
                                <td>{data.country}</td>
                                <td>{data.description}</td>
                                <td>{data.delta === 999 ? '-' : data.delta + ' ms'}</td>
                            </tr>
                        );
                    })
                }
                </tbody>

            </table>
        </div>
    );
};

export default ServerSpeed;
