import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

const Spinner = () => {
    return (
        <div className="fa-3x text-center">
            <FontAwesomeIcon icon={faSpinner} spin/>
        </div>
    );
};

export default React.memo(Spinner);
