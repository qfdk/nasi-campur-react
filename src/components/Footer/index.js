import React from 'react';
import packageJson from '../../../package.json';

const Footer = () => {
    return (
        // <div className="container">
            <footer className="bs-docs-footer">
            <hr/>
                <b>Build</b> with all the ❤ by <a href="https://qfdk.me" target="_blank" rel="noreferrer">@qfdk</a>,&nbsp;
                <b>version</b> : {packageJson.version}
                <br/>
                Code licensed <a href="https://github.com/twbs/bootstrap/blob/master/LICENSE" target="_blank"
                                 rel="noreferrer">MIT</a>, docs <a
                href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY
                3.0</a>, coding with <a href="https://reactjs.org/" rel="noreferrer" target="_blank">React.js</a>
            </footer>
        // </div>
    );
};

export default React.memo(Footer);
