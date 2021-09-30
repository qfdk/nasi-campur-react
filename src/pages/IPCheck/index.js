import React, {Fragment} from 'react';

const IPCheck = () => {
    return (
        <Fragment>
            <h3>IP 检查</h3>
            <table className={'table'}>
                <thead>
                <tr>
                    <th>位置</th>
                    <th>检测结果</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><b>🇨🇳&nbsp;&nbsp;China</b></td>
                    <td>
                        <iframe title="china" src="https://cn.ipcelou.com" width="100%" height="30" scrolling="no"
                                frameBorder="0"
                                marginHeight="0" marginWidth="0"></iframe>
                    </td>
                </tr>

                <tr>
                    <td><b>🌍&nbsp;&nbsp;World</b></td>
                    <td>
                        <iframe title="Outside" src="https://api-ipv4.ip.sb/ip" width="100%" height="30"
                                scrolling="no" frameBorder="0"
                                marginHeight="0" marginWidth="0"></iframe>
                    </td>
                </tr>

                <tr>
                    <td><b><i className="fab fa-google"></i> Google</b></td>
                    <td>
                        <iframe title="google" src="https://ipv4.appspot.com" width="100%" height="30" scrolling="no"
                                frameBorder="0"
                                marginHeight="0" marginWidth="0"></iframe>
                    </td>
                </tr>
                </tbody>
            </table>
        </Fragment>
    );
};

export default IPCheck;
