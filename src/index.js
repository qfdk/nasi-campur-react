import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery/dist/jquery.min';

window.$ = $;
window.jQuery = $;
loadable(() => require('bootstrap/dist/js/bootstrap.min'));

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
