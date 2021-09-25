import React, {Fragment} from 'react';
import {useHistory} from 'react-router-dom';

const Alert = React.memo(({type = 'danger', message}) => {
    const history = useHistory();

    const handleClick = () => {
        history.goBack();
    };

    return (
        <Fragment>
            <div className={`alert alert-${type}`} role="alert" style={{marginTop: '20px'}}>
                <strong>服务器可能开小差了 !</strong>
                <p>{message}</p>
            </div>
            <button onClick={handleClick} className={'btn btn-primary'}><i className={'fa fa-undo'}/> 返回</button>
        </Fragment>
    );
});

export default Alert;
