import React from 'react';

const Alert = React.memo(({type = 'danger', message}) => {
    return (
        <div className={`alert alert-${type}`} role="alert" style={{marginTop: '20px'}}>
            <strong>{type.toUpperCase()}!</strong> {message}
        </div>
    );
});

export default Alert;
