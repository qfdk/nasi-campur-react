import React, {Fragment, useState} from 'react';
import './user-info.css';
import httpRequest from '../../request';
import Spinner from '../../widget/Spinner';

const createMarkup = (html) => {
    return {__html: html};
};

const Error = React.memo(({error}) => {
    return (
        <div className="alert alert-warning" role="alert" style={{marginTop: '20px'}}>
            <strong>Warning!</strong> {error.status} - {error.stack}
        </div>
    );
});

const UserInfo = ({data}) => {
        const {user, traffic, endTime, v2rayImg, ssrImg, v2ray, error} = data;

        const [containerState, setContainerState] = useState(error ? {} :
            {port: user.containerPort, status: user.containerStatus, ssrImg, qrCode: user.qrCode});
        const [loading, setLoading] = useState(false);

        const reCreateContainer = (uid) => {
            setLoading(true);
            httpRequest.get('/users/reCreateContainer', {params: {uid, json: true}}).then(response => {
                setLoading(false);
                const {
                    containerPort,
                    containerStatus,
                    ssrImg,
                    qrCode
                } = response.data;
                setContainerState(oldState => {
                    return {
                        ...oldState,
                        port: containerPort,
                        status: containerStatus,
                        ssrImg,
                        qrCode
                    };
                });
            }).catch(e => {
                console.log(e);
            });
        };

        return (
            error ? <Error error={error}/> :
                <Fragment>
                    <div className="panel panel-primary" style={{marginTop: '20px'}}>
                        <div className="panel-heading">
                            <h3 className="panel-title"><span>欢迎回来， </span><b>{user.nickname}</b></h3>
                        </div>
                        <div className="panel-body row">
                            <div className="form-inline col-md-10 col-md-offset-2">
                                <div className="form-group col-md-5">
                                    <label className="control-label" htmlFor="wechatName">微信账号:</label>
                                    <span className="form-control-static" id="wechatName">
                            <span dangerouslySetInnerHTML={createMarkup(user.icon)}/>
                                        {user.wechatName}
                            </span>
                                </div>
                                <div className="form-group col-md-5">
                                    <label className="control-label" htmlFor="isEnable">账户状态：</label>
                                    <span className="form-control-static" id="isEnable">
                            {user.isEnable ? <span className="label label-success">已捐助</span> : <span
                                className="label label-warning">暂时免费</span>}
                        </span>
                                </div>
                            </div>
                            <div className="form-inline col-md-10 col-md-offset-2">
                                <div className="form-group col-md-5">
                                    <label className="control-label" htmlFor="containerLocation">实例区域：</label>
                                    <span className="form-control-static"
                                          id="containerLocation">{user.server.country}</span>
                                </div>
                                <div className="form-group col-md-5">
                                    <label className="control-label" htmlFor="endTime">结束时间：</label>
                                    <span className="form-control-static" id="endTime">{endTime}</span>
                                </div>
                            </div>
                            <div className="form-inline col-md-10 col-md-offset-2">
                                <div className="form-group col-md-5">
                                    <label className="control-label" htmlFor="networkTraffic">已使用流量：</label>
                                    <span id="networkTraffic" className="form-control-static">{traffic}</span>
                                </div>
                                {user.hasSSR && <div className="form-group col-md-5">
                                    <label className="control-label" htmlFor="port">端口：</label>
                                    <span id="port" className="form-control-static">
                                        {loading ? <span className="label label-warning">
                                            <i className="fas fa-sync fa-spin"></i> 正在生成端口</span> :
                                            containerState.port}
                                    </span>
                                </div>}
                            </div>
                            {user.hasSSR && <div className="form-inline col-md-10 col-md-offset-2">
                                <div className="form-group col-md-5">
                                    <label className="control-label">服务状态：</label>
                                    <span className="form-control-static">
                                    {containerState.status === 'running' &&
                                    <span className="label label-success">正在运行</span>}
                                        {containerState.status === 'exited' &&
                                        <span className="label label-danger">已停止</span>}
                                </span>
                                </div>
                                {user.enableSelfControl && <div className="form-group col-md-5">
                                    <label className="control-label">自主操作：</label>
                                    <button className="btn btn-info btn-xs load"
                                            disabled={loading}
                                            onClick={() => {reCreateContainer(user._id);}}>
                                        <span className="glyphicon glyphicon-random"/> 重置二维码
                                    </button>
                                </div>}
                            </div>}
                        </div>
                    </div>
                    {user.hasV2ray && <div className="panel panel-success">
                        <div className="panel-heading text-center">
                            <h3 className="panel-title">V2ray 客户端专用</h3>
                        </div>
                        <div className="panel-body">
                            <img id="v2rayUrl"
                                 className="img-responsive center-block img-height"
                                 src={v2rayImg}
                                 alt="二维码"/>
                            <pre dangerouslySetInnerHTML={createMarkup(v2ray)}></pre>
                        </div>
                    </div>}
                    {user.hasSSR && <div className="panel panel-success">
                        <div className="panel-heading text-center">
                            <h3 className="panel-title"><span>使用小火箭扫描二维码 或 </span>
                                <a className="btn btn-primary btn-text"
                                   href={`ssr://${containerState.qrCode}`}>点击此按钮</a>
                                <span>添加节点</span></h3></div>
                        <div className="panel-body">
                            {!loading && <img id="v2rayUrl"
                                              className="img-responsive center-block img-height"
                                              src={containerState.ssrImg}
                                              alt="二维码"/>}
                            {loading && <Spinner/>}
                            <p className="text-center">节点二维码</p>
                        </div>
                    </div>}
                </Fragment>
        );
    }
;

export default UserInfo;
