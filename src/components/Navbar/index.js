import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './index.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.addEventListener('click', () => {
            setIsOpen(false);
        });
    }, []);

    const menuClickHandler = (e) => {
        // 防止冒泡传到父容器
        e.nativeEvent.stopImmediatePropagation();
        setIsOpen(s => !s);
    };

    return (
        <nav className="navbar navbar-fixed-top navbar-inverse">
            <div className="container">
                <div className="navbar-header">
                    <button type="button"
                            className={isOpen ? 'navbar-toggle' : 'navbar-toggle collapsed'}
                            data-toggle="collapse"
                            onClick={menuClickHandler}
                            data-target="menuList" aria-expanded={!isOpen}>
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                    <NavLink className="navbar-brand" to="/" exact>
                        🚀 准备好了吗 ?
                    </NavLink>
                </div>

                <div className={isOpen ? 'collapse navbar-collapse in' : 'collapse navbar-collapse'} id="menuList">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" exact>
                                <span className="icon-home3"></span> 主页
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/servers" exact>
                                <span className="icon-database"></span> 服务器列表
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/speed-test" exact>
                                <span className="icon-meter"></span> 测速
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/ip-check" exact>
                                <span className="icon-compass2"></span> IP检查
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/help" exact>
                                <span className="icon-book"></span> 帮助
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
