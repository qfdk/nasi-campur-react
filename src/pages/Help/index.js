import React from 'react';

const Help = () => {
    return (
        <div className="container">
            <h3>帮助指引</h3>
            <h4>使用前请对照是否满足以下条件</h4>
            <ul>
                <li>iOS设备 (非 iOS 设备请单独联系)</li>
                <li>非大陆 App Store Id (可以淘宝搜索)</li>
                <li>4G/5G 畅通的网络环境</li>
            </ul>
            <p style={{marginTop: '15px'}} className="alert alert-warning">
                本服务提供给 "回国" 需要<b>查资料,发邮件</b>的小伙伴合理使用，禁止做违法用途。
            </p>
            <h4>1. 下载必需APP</h4>
            <p>
                国外苹果id用户请直接搜索下载 <strong><a href="https://apps.apple.com/us/app/potatso-lite/id1239860606">Potatso
                Lite</a></strong> 或 <b><a href="https://apps.apple.com/us/app/flyrouter/id1354248771">FlyRouter</a></b>
                <br/>
                推荐使用 <b><a href="https://apps.apple.com/us/app/shadowrocket/id932747118">Shadowrocket (小火箭)</a> =>
                可以淘宝搜索</b>
            </p>
            <p className="text-danger">如果无法找到app，请更换国外苹果id (自行注册或者淘宝)，如果 步骤1 未完成，请无视下面的说明。</p>
            <h4>2. 查询专属二维码</h4>
            <p>请确保已经下载步骤 1 之中提到的 App，<strong><a href="https://apps.apple.com/us/app/potatso-lite/id1239860606">Potatso
                Lite</a></strong> 或者 <b><a href="https://apps.apple.com/us/app/flyrouter/id1354248771">FlyRouter</a></b>
            </p>
            <p>个人二维码查询地址: <a className="label label-danger" href="/">点这里</a></p>
            <p>输入个人微信账号，查询信息如下</p>
            <img style={{height: '400px'}} src="https://i.loli.net/2021/02/01/npde5hJAMrsqICF.png"
                 className="img-responsive img-thumbnail" alt="exp"/>
            <h4>3. 添加服务器</h4>
            <p>最简单的方式，点击按钮添加服务器.(<span className="text-danger">如果没有弹出界面</span>，请手动打开第一步下载的 app 扫描第 2 步中显示的二维码)</p>
            <p>输入弹出框可以自定义名字，这里用 Go 来举例子</p>
            <img style={{height: '400px'}} className="img-responsive img-thumbnail"
                 src="https://i.loli.net/2021/01/31/ubUcegZK9v1SN8L.jpg"/>
            <img style={{height: '400px'}} className="img-responsive img-thumbnail"
                 src="https://i.loli.net/2021/01/31/Lj59rnhKVA8HpWd.jpg"/>
            <p>点击连接，现在您可以畅快的上网了 !</p>
            <hr/>
            <h4>FAQ(常见问题集)</h4>
            <ul>
                <li>大哥，上不了网了！
                    <ol>当您看到这个页面的时候服务器是正常工作的. 请尝将手机切换到 4G 模式并关掉 WiFi 或者重建二维码</ol>
                </li>
                <li>如何重建二维码？
                    <ol>回到上面👆的步骤 2，扫描二维码的页面，旁边有一个重建二维码的按钮，点击一次。等待二维码重新生成，删除app 里面的老服务器，并重复步骤 3.添加新服务器</ol>
                </li>
            </ul>
            <hr/>
            <h4>安卓手机(类比iPhone设置)</h4>
            <p><span>点击下载 <a
                href="https://down.qfdk.me/?/%E8%BD%AF%E4%BB%B6/%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/android/shadowsocksr-android-3.5.3.apk">shadowsocksr-android-3.5.3.apk</a> ，并扫描查询到的二维码</span>
            </p>
            <h4>MacOS(类比iPhone设置)</h4>
            <p><span>点击下载 <a className="md_compiled"
                             href="https://down.qfdk.me/?/%E8%BD%AF%E4%BB%B6/%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/macOS/ClashX.dmg">ClashX.dmg</a>,复制到application 文件夹下，并扫描查询到的二维码</span>
            </p>
            <h4>
                <del>Windows(不提供技术支持，类比iPhone设置)</del>
            </h4>
        </div>
    );
};
export default React.memo(Help);
