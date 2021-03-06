import React from 'react';
import packageJson from '../../../package.json';

const Footer = () => {
    return (
        <footer className="bs-docs-footer">
            <hr/>
            Code licensed <a href="https://github.com/twbs/bootstrap/blob/master/LICENSE" target="_blank"
                             rel="noreferrer">MIT</a>, powered by <a href="https://reactjs.org/" rel="noreferrer"
                                                                     target="_blank">React.js</a>
            <br/>
            <b>Build</b> with all the ❤ by <a href="https://qfdk.me" target="_blank" rel="noreferrer">@qfdk</a>,&nbsp;
            <b>version</b> : {packageJson.version}
        </footer>
    );
};

export default React.memo(Footer);
