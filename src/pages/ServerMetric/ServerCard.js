import React, {Fragment} from 'react';
import './server.css';

const StaticInfo = React.memo(({cpu, type, os}) => {
    return (
        <Fragment>
            <div className="metric inline"><label>CPU信息:</label>
                <span>{cpu ? cpu.model : ''}</span>
            </div>
            <div className="metric"><label>系统信息:</label>
                <span>{type} {os}</span>
            </div>
        </Fragment>
    );
});

const ServerCard = (props) => {
    const {country, description, uptime, lastUpdateTime, cpu, network, type, os, disk, memory} = props;
    return (
        <div className="col-xs-12 col-sm-6 col-md-4">
            <div className={cpu ? 'panel panel-success' : 'panel panel-danger'}>
                <div className="panel-heading"><h3 className="panel-title">{country} - {description}</h3></div>
                <div className="panel-body">
                    <div className="metric-status">
                        <StaticInfo cpu={cpu} type={type} os={os}/>
                        <div className="metric"><label>流量使用:</label>
                            {network && <span>上传 {network.rx_formatted} | 下载 {network.tx_formatted} </span>}
                        </div>
                        <div className="metric"><label>在线时长:</label>
                            <span>{uptime}</span></div>
                        <div className="metric"><label>最后更改 IP:</label>
                            <span>{lastUpdateTime}</span></div>
                        <div className="metric">
                            {/*<label className="usageLabel inline">CPU 使用率:</label>*/}
                            <div className="usageProcess">
                                <div className="progress">
                                    <div className="progress-placeholder">CPU 使用率: {cpu ? cpu.usage : '0.00'}%</div>
                                    <div className="progress-text">CPU 使用率: {cpu ? cpu.usage : '0.00'}%</div>
                                    <div className="progress-bar progress-bar-info progress-bar-striped"
                                         role="progressbar"
                                         style={{width: `${cpu ? cpu.usage : 0}%`}}/>
                                </div>
                            </div>
                        </div>
                        <div className="metric">
                            {/*<label className="usageLabel inline">RAM 使用率:</label>*/}
                            <div className="usageProcess">
                                <div className="progress">
                                    <div className="progress-placeholder">RAM 使用率: {memory?memory.current:' - '}/{memory?memory.total:' - '}</div>
                                    <div className="progress-text">RAM 使用率: {memory?memory.current:' - '}/{memory?memory.total:' - '}</div>
                                    <div className="progress-bar progress-bar-info progress-bar-striped"
                                         role="progressbar"
                                         style={{width: `${memory ? memory.usage : 0}%`}}/>
                                </div>
                            </div>
                        </div>
                        <div className="metric">
                            {/*<label className="usageLabel inline">硬盘使用率:</label>*/}
                            <div className="usageProcess">
                                <div className="progress">
                                    <div className="progress-placeholder">硬盘使用率: {disk?disk.current:' - '}/{disk?disk.total:' - '}</div>
                                    <div className="progress-text">硬盘使用率: {disk?disk.current:' - '}/{disk?disk.total:' - '}</div>
                                    <div className="progress-bar progress-bar-info progress-bar-striped"
                                         role="progressbar"
                                         style={{width: `${disk ? disk.usage : 0}%`}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ServerCard);
