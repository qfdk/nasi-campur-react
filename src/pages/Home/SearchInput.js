import React, {Fragment, useState} from 'react';
import {useHistory} from 'react-router-dom';

const SearchInput = React.memo(() => {
        const history = useHistory();

        const [wechatName, setWechatName] = useState('');

        const wechatNameChangeHandler = (e) => {
            if (e.target.value.length) {
                setWechatName(e.target.value);
            } else {
                setWechatName('');
            }
        };

        const searchBtnHandler = () => {
            history.push(`/search/${wechatName}`);
        };

        return (
            <Fragment>
                <div className="input-group col-md-6 col-md-offset-3">
                    <span className="input-group-addon" id="basic-addon1">@</span>
                    <input autoComplete="off" value={wechatName} type="text"
                           className="form-control" placeholder="微信用户名"
                           onChange={wechatNameChangeHandler}
                           onKeyUp={(e) => {
                               if (e.key === 'Enter') {searchBtnHandler();}
                           }}
                           aria-describedby="basic-addon1"/>
                    <div className="input-group-btn">
                        <button type="submit"
                                disabled={!wechatName.length}
                                className="btn btn-primary" onClick={searchBtnHandler}>
                            <i className="fa fa-search" aria-hidden="true"></i> 查询
                        </button>
                    </div>
                </div>
            </Fragment>
        );
    }
);

export default SearchInput;
