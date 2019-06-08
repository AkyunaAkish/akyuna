import React, { PureComponent } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles1 = theme => ({
    success: {
        color: 'rgb(255,255,255)',
        fill: 'rgb(255,255,255)',
        backgroundColor: green[600],
    },
    error: {
        color: 'rgb(255,255,255)',
        fill: 'rgb(255,255,255)',
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        color: 'rgb(255,255,255)',
        fill: 'rgb(255,255,255)',
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        color: 'rgb(255,255,255)',
        fill: 'rgb(255,255,255)',
        backgroundColor: amber[700],
    },
    icon: {
        color: 'rgb(255,255,255)',
        fill: 'rgb(255,255,255)',
        fontSize: 20,
    },
    iconVariant: {
        color: 'rgb(255,255,255)',
        fill: 'rgb(255,255,255)',
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        color: 'rgb(255,255,255)',
        fill: 'rgb(255,255,255)',
        fontSize: 20,
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent aria-describedby='client-snackbar'
                         className={ classNames(classes[variant], className) }
                         message={
                             <span id='client-snackbar' className={ classes.message }>
                                 <Icon className={ classNames(classes.icon, classes.iconVariant) } />
                                 { message }
                             </span>
                         }
                         action={[
                             <IconButton key='close'
                                         aria-label='Close'
                                         color='inherit'
                                         className={ classes.close }
                                         onClick={ onClose }>
                             <CloseIcon className={ classes.icon } />
                             </IconButton>,
                         ]}
                         { ...other } />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
});

class CustomSnackBar extends PureComponent {
    render = () => {
        return (
            <Snackbar anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        autoHideDuration={ this.props.autoHideDuration || null }
                        open={ this.props.snackbarOpen }
                        onClose={ () => this.props.handleSnackbarClose() }>
                <MySnackbarContentWrapper onClose={ () => this.props.handleSnackbarClose() }
                                          variant={ this.props.snackbarVariant }
                                          message={ this.props.snackbarContent } />
            </Snackbar>
        );
    };
}
export default withStyles(styles2)(CustomSnackBar);