import React from 'react';

const Footer = () => {
    return (
        <div className="container">
            <hr/>
            <footer className="bs-docs-footer">
               <b>Designed and built</b> with all the ❤ in the world by
                    <a href="#" rel="noopener" target="_blank"> @qfdk</a>.

                <p>Code licensed <a href="https://github.com/twbs/bootstrap/blob/master/LICENSE" target="_blank"
                                    rel="license noopener">MIT</a>, docs <a
                    href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="license noopener">CC BY
                    3.0</a>, coding with <a href="https://reactjs.org/" rel="react.js" target="_blank">React.js</a>
                </p>
            </footer>
        </div>
    );
};

export default React.memo(Footer);
