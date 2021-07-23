import React, {Fragment, lazy, Suspense, useReducer} from 'react';
import httpRequest from '../../request';
import Spinner from '../../widget/Spinner';

const UserInfo = lazy(() => import('./UserInfo'));

const initUserInfo = {
    wechatName: '',
    isLoading: false,
    data: null
};

const userConstants = {
    LOADING: 'LOADING',
    RESET: 'RESET',
    SET_WECHATNAME: 'SET_WECHATNAME',
    SET: 'SET',
    SET_ERROR: 'SET_ERROR'
};

const userReducer = (state, action) => {
    switch (action.type) {
        case userConstants.LOADING:
            return {...state, isLoading: true, data: null};
        case userConstants.RESET:
            return {isLoading: false, data: null, wechatName: ''};
        case userConstants.SET_WECHATNAME:
            return {...state, wechatName: action.payload};
        case userConstants.SET:
            return {...state, isLoading: false, data: action.payload};
        default:
            return state;
    }
};

const SearchInput = React.memo(() => {
        const [user, userDispatch] = useReducer(userReducer, initUserInfo);

        const wechatNameChangeHandler = (e) => {
            if (e.target.value.length) {
                userDispatch({type: userConstants.SET_WECHATNAME, payload: e.target.value});
            } else {
                userDispatch({type: userConstants.RESET});
            }
        };

        const searchBtnHandler = () => {
            userDispatch({type: userConstants.LOADING});
            httpRequest.get('/users/findUserByWechatName', {
                params: {
                    wechatName: user.wechatName,
                    json: true
                }
            }).then(response => {
                userDispatch({type: userConstants.SET, payload: response.data});
            }).catch(e => {
                userDispatch({type: userConstants.SET, payload: {error: {details: e, status: '500', stack: '请求失败'}}});
            });
        };

        return (
            <Fragment>
                <div className="input-group col-md-6 col-md-offset-3">
                    <span className="input-group-addon" id="basic-addon1">@</span>
                    <input autoComplete="off" value={user.wechatName} type="text"
                           className="form-control" placeholder="微信用户名"
                           onChange={wechatNameChangeHandler}
                           onKeyUp={(e) => {
                               if (e.key === 'Enter') {searchBtnHandler();}
                           }}
                           aria-describedby="basic-addon1"/>
                    <div className="input-group-btn">
                        <button type="submit"
                                disabled={!user.wechatName.length}
                                className="btn btn-primary" onClick={searchBtnHandler}>查询
                        </button>
                    </div>
                </div>
                {user.isLoading && <Spinner/>}
                {!user.isLoading && user.data &&
                <Suspense fallback={<Spinner/>}>
                    <UserInfo data={user.data}/>
                </Suspense>
                }
            </Fragment>
        );
    }
);

export default SearchInput;
