import React, {Fragment} from 'react';

const IPCheck = () => {

    return (
        <Fragment>
            <h3>IP 检查</h3>
            <table className={'table'}>
                <thead>
                    <tr>
                        <th>检测点</th>
                        <th>检测结果</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>China Site</td>
                    <td>
                        <iframe title="china" src="http://cn1.qfdk.me:3001/ip" width="100%" height="30" scrolling="no"
                                frameBorder="0"
                                marginHeight="0" marginWidth="0"></iframe>
                    </td>
                </tr>

                <tr>
                    <td>Outside</td>
                    <td>
                        <iframe title="Outside" src="https://api-ipv4.ip.sb/ip" width="100%" height="30"
                                scrolling="no" frameBorder="0"
                                marginHeight="0" marginWidth="0"></iframe>
                    </td>
                </tr>

                <tr>
                    <td>Google</td>
                    <td>
                        <iframe title="google" src="http://sspanel.net/ip.php" width="100%" height="30" scrolling="no"
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
