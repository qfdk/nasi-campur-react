import React from 'react';

const Footer = () => {
    return (
        <div className="container">
            <hr/>
            <footer className="bs-docs-footer">
                <p>Designed and built with all the love in the world by
                    <a href="#" rel="noopener" target="_blank">@qfdk</a>.
                </p>
                <p>Code licensed <a href="https://github.com/twbs/bootstrap/blob/master/LICENSE" target="_blank"
                                    rel="license noopener">MIT</a>, docs <a
                    href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="license noopener">CC BY
                    3.0</a>.
                </p>
            </footer>
        </div>
    );
};

export default React.memo(Footer);
