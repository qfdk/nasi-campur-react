import React from 'react';

const Spinner = () => {
    return (
        <div className="fa-3x text-center">
            <i className="fas fa-spinner fa-spin"></i>
        </div>
    );
};

export default React.memo(Spinner);
