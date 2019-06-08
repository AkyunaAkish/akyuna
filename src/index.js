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
            black: '#000',
            white: 'rgba(229, 229, 229, 1)'
        },
        background: {
            paper: 'rgba(229, 229, 229, 1)',
            default: 'rgba(229, 229, 229, 1)'
        },
        primary: {
            light: 'rgba(40, 44, 51, 0.75)',
            main: 'rgba(40, 44, 51, 1)',
            dark: 'rgba(32, 34, 42, 0.12)',
            contrastText: '#fff'
        },
        secondary: {
            light: 'rgba(34, 183, 223, 0.83)',
            main: 'rgba(34, 183, 223, 1)',
            dark: 'rgba(8, 107, 138, 1)',
            contrastText: '#fff'
        },
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff'
        },
        text: {
            primary: 'rgba(32, 34, 42, 1)',
            secondary: 'rgba(40, 44, 51, 0.73)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)'
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