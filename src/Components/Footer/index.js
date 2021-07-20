import React from 'react';

const Footer = () => {
    return (
        <div className="container">
            <hr/>
            <footer className="bs-docs-footer">
                <b>Designed and built</b> with all the ❤ in the world by
                <a href="https://qfdk.me" target="_blank" rel="noreferrer" > @qfdk</a>.

                <p>Code licensed <a href="https://github.com/twbs/bootstrap/blob/master/LICENSE" target="_blank"
                                    rel="noreferrer">MIT</a>, docs <a
                    href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY
                    3.0</a>, coding with <a href="https://reactjs.org/" rel="noreferrer" target="_blank">React.js</a>
                </p>
            </footer>
        </div>
    );
};

export default React.memo(Footer);
