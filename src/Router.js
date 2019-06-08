// client-side socket.io import
import io from 'socket.io-client';

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import setSocket from './redux/actions/setSocket';
import updateDimensions from './redux/actions/updateDimensions';

import { HOST } from './services/host';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

import $ from 'jquery';

import CustomSnackBar from './components/Shared/components/CustomSnackBar/CustomSnackBar';

import { toggleSnackbar } from './redux/actions/snackBar';

import TopBar from './components/Shared/components/TopBar/TopBar';

// to be able to use Object.keys method in IE 11
import objectKeysPolyfill from './services/polyfills/objectKeysPolyfill';
objectKeysPolyfill();

// async components (for code-splitting)
const Home = asyncComponent({
	resolve: () => import('./components/Home/Home'),
});


class Router extends PureComponent {
	componentDidMount = () => {        
        this.props.updateDimensions({
            width: $(window).width(),
            height: $(window).height()
        });

        $(window).on('resize', () => {
            this.props.updateDimensions({
                width: $(window).width(),
                height: $(window).height()
            });
		});
		
		// on app load, connect socket to server
        // and set to window
        let socket = io.connect(HOST, { transports: [ 'websocket' ] }); //{ transports: [ 'websocket' ] } helps fix polling warning as described here: https://stackoverflow.com/questions/41381444/websocket-connection-failed-error-during-websocket-handshake-unexpected-respon
        
        // give socket 100ms before setting socket
        setTimeout(() => {
            this.props.setSocket(socket);
        }, 100);
        
        // every 3 seconds check if sockets needs to be reconnected
        this.intervalId = setInterval(() => {
            if(!this.props.socket || !this.props.socket.connected) {
                // if socket disconnects 
                this.disconnected = true;

                if(this.props.socket) {
                    this.props.socket.removeAllListeners();
                    this.props.socket.disconnect();
                    this.props.socket.destroy();
                }

                if(!this.props.snackbarOpen) {
                    this.handleSnackbarOpen('Disconnected from server, retrying...', 'error');
                }

                // retry connecting socket
                let socket = io.connect(HOST, { transports: [ 'websocket' ] }); //{ transports: [ 'websocket' ] } helps fix polling warning as described here: https://stackoverflow.com/questions/41381444/websocket-connection-failed-error-during-websocket-handshake-unexpected-respon
        
                // give socket 100ms before setting socket
                setTimeout(() => {
                    this.props.setSocket(socket);
                }, 100);
            } else if(this.disconnected) {
                // if socket reconnects after being disconnected
                this.disconnected = false;
                this.handleSnackbarOpen('Reconnected to server', 'success');

                this.timeoutId = setTimeout(() => {
                    this.handleSnackbarClose();
                }, 3000);
            } 
        }, 3000);
	};

	handleSnackbarOpen = (content, variant) => {
        this.props.toggleSnackbar({
            snackbarOpen: true,
            snackbarVariant: variant,
            snackbarAutoHideDuration: 5000,
            snackbarContent: content
        });
    };
    
    handleSnackbarClose = () => {
        this.props.toggleSnackbar({
            snackbarOpen: false,
        });
	};

	componentWillUnmount = () => {
        // if socket is defined, remove all listeners if router unmounts
        if(this.props.socket && this.props.socket.removeAllListeners) {
            this.props.socket.removeAllListeners();
        }

        // clear socket.io retry interval
        clearInterval(this.intervalId);

        // clear reconnect timeout
        clearTimeout(this.timeoutId);
    };
	
	render() {
		return (
			<BrowserRouter>
                <Fragment>
                    <TopBar />

                    <Switch>                        
                        <Route exact path='/' component={ Home } />
						<Redirect from='*' to='/' />
					</Switch>

					<CustomSnackBar snackbarOpen={ this.props.snackbarOpen } 
                                    snackbarVariant={ this.props.snackbarVariant }
                                    snackbarContent={ this.props.snackbarContent }
                                    autoHideDuration={ this.props.snackbarAutoHideDuration }
                                    handleSnackbarClose={ this.handleSnackbarClose } />
				</Fragment>
			</BrowserRouter>
		);
	}
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
        snackbarOpen: state.snackBar.snackbarOpen,
        snackbarVariant: state.snackBar.snackbarVariant,
        snackbarContent: state.snackBar.snackbarContent,
        snackbarAutoHideDuration: state.snackBar.snackbarAutoHideDuration,
    };
}

export default connect(mapStateToProps, { setSocket, updateDimensions, toggleSnackbar })(Router);
