import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <NavLink className="navbar-brand" to="/" exact>
                        🚀 准备好了吗 ？
                    </NavLink>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" exact>
                                <i className="fas fa-tachometer-alt">
                                </i> 主页
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/help" exact>
                                <i className="far fa-address-book">
                                </i> 帮助
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/server" exact>
                                <i className="far fa-chart-bar">
                                </i> 服务器列表
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default React.memo(Navbar);
