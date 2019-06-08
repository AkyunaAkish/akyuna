import React from 'react';
import ReactDOM from 'react-dom';

import './sass/style.scss';

import Router from './Router';

import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import configureStore from './redux/store';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import 'typeface-roboto';

// // variable to determine if webpack is running in production or development
// const dev = process.env.NODE_ENV === 'development';

// override theme colors. if not listed, they will be pulled from palette[palette-level][color-class] (ex: palette.primary.dark)
const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    palette: {
        common: {
            black: 'rgba(40, 44, 51, 1)',
            white: 'rgba(245, 245, 245, 1)'
        },
        background: {
            paper: 'rgba(245, 245, 245, 1)',
            default: 'rgba(245, 245, 245, 1)'
        },
        primary: {
            light: 'rgba(207, 173, 239, 1)',
            main: 'rgba(181, 108, 244, 1)',
            dark: 'rgba(160, 64, 246, 1)',
            contrastText: '#fff'
        },
        secondary: {
            light: 'rgba(232, 175, 241, 1)',
            main: 'rgba(221, 143, 236, 1)',
            dark: 'rgba(213, 107, 233, 1)',
            contrastText: '#fff'
        },
        error: {
            light: '#e57373',
            main: 'rgba(235, 89, 72, 1)',
            dark: '#d32f2f',
            contrastText: '#fff'
        },
        text: {
            primary: 'rgba(40, 44, 51, 1)',
            secondary: 'rgba(92, 95, 99, 1)',
            disabled: 'rgba(146, 149, 153, 1)',
            hint: 'rgba(132, 137, 148, 1)'
        }
    }
});

const store = configureStore();

const render = () => {
    ReactDOM.render(
        <Provider store={ store }>
            <MuiThemeProvider theme={ theme }>
                <Router />
            </MuiThemeProvider>
        </Provider>,
        document.getElementById('root')
    );
};

render(Router);

// uncomment for hot module replacement
if (module.hot) {
    module.hot.accept('./Router', () => {
        const NextApp = require('./Router').default;
        render(NextApp);
    });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();



