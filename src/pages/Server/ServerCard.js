import React, {Fragment} from 'react';
import './server.css';

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

export default ServerCard;
