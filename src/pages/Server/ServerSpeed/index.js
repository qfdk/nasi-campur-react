import React, {useEffect, useState} from 'react';
import httpRequest from '../../../request';
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ServerSpeed = (props) => {
    // const {data} = props;
    const [servers, setServer] = useState(props.data);

    const fetchData = () => {
        servers.map((server, index) => {
            const startTime = new Date();
            httpRequest.get(server.url).then(response => {
                const endTime = new Date();
                const delta = endTime - startTime;
                const updateState = [...servers];
                const newDate = {...server, ...delta};
                updateState[index] = newDate;
                setServer(newDate.sort((a, b) => a - b));
            }).catch(e => {
                console.log(e.message);
            });
        });
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
                                <td>{data.delta} ms</td>
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
