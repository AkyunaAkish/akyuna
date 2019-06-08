import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

import * as icons from '@material-ui/icons';

import $ from 'jquery';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

const topBarLinks = [
    {
        name: 'Home',
        link: '/',
        icon: 'Home',
        order_number: 0,
        external: false
    }
];

class TopBar extends PureComponent {
    state = {
        mobileMoreAnchorEl: null,
        searchText: ''
    };

    componentDidMount = () => {
        // resize handler
        this.myListenerWithContext = this.handleResize.bind(this);

        // close menus after window resize to avoid misplacement of dropdowns
        window.addEventListener('resize', this.myListenerWithContext);
    };

    handleResize = () => {
        if (this.state.mobileMoreAnchorEl) {
            this.handleMenuClose();
        }
    };

    componentWillUnmount = () => {
        // stop listening to resize after component unmounts
        window.removeEventListener('resize', this.myListenerWithContext);
    };

    handleMenuClose = () => {
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    handleSearchChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    };

    handleSearch = (e) => {
        e.preventDefault();

        if (this.state.searchText.trim().length) {
            this.setState({
                searchText: ''
            });

            this.props.history.push(`/search/${this.state.searchText}`);
            this.handleMobileMenuClose();

            // to remove highlight of mobile button after search closes the mobile menu
            setTimeout(() => {
                $('button').blur();
            }, 500);
        }
    };

    handleNavigate = (to) => {
        this.props.history.push(to);
    };

    getLinkIcon = (link) => {
        if(link.icon.split('/')[1] === 'images') {
            return (
                <img src={ link.icon }
                     className='top-bar-icon'
                     alt={ link.name } />
            );
        } else {
            let Icon = icons[link.icon];
            return <Icon />;
        }
    };

    renderTopBarLinks = () => {
        return topBarLinks.map((link, i) => {
            return (
                <IconButton key={ i } color='inherit' onClick={(e) => {
                    this.handleNavigate(link.link);
                }}>
                    <Tooltip title={ link.name }>
                        { this.getLinkIcon(link) }
                    </Tooltip>
                </IconButton>
            );
        });
    };

    renderTopBarLinksMobile = () => {
        return topBarLinks.map((link, i) => {
            return (
                <MenuItem key={ i } onClick={(e) => {
                    this.handleNavigate(link.link);
                    this.handleMobileMenuClose(e);
                }}>
                    <IconButton color='inherit'>
                        { this.getLinkIcon(link) }
                    </IconButton>
                    <p>{ link.name }</p>
                </MenuItem>
            );
        });
    };

    render = () => {
        const { mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMobileMenu = (
            <Menu anchorEl={ mobileMoreAnchorEl }
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={ isMobileMenuOpen }
                  onClose={ this.handleMenuClose }>
                <MenuItem classes={{ root: 'search-container-mobile' }}>
                    <div className={ classes.search }>
                        <form onSubmit={ this.handleSearch }>
                            <div className={ classes.searchIcon }>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='Search…'
                                       value={ this.state.searchText }
                                       onChange={ this.handleSearchChange }
                                       classes={{
                                           root: classes.inputRoot,
                                           input: classes.inputInput,
                                       }} />
                        </form>
                    </div>
                </MenuItem>

                { this.renderTopBarLinksMobile() }
            </Menu>
        );

        return (
            <div className={`top-bar ${classes.root}`}>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Link to='/' className='top-bar-home'>
                            <img className='top-bar-img'
                                 src={`/images/logos/lele_styles_logo_small.png`}
                                 alt='lele styles' />
                        </Link>
                        <div className={ `search-container ${classes.search}` }>
                            <form onSubmit={ this.handleSearch }>
                                <div className={ classes.searchIcon }>
                                    <SearchIcon />
                                </div>
                                <InputBase placeholder='Search…'
                                           value={ this.state.searchText }
                                           onChange={ this.handleSearchChange }
                                           classes={{
                                               root: classes.inputRoot,
                                               input: classes.inputInput,
                                           }} />
                            </form>
                        </div>
                        <div className={ classes.grow } />
                        <div className={ classes.sectionDesktop }>
                            { this.renderTopBarLinks() }
                        </div>
                        <div className={ classes.sectionMobile }>
                            <IconButton aria-haspopup='true' onClick={ this.handleMobileMenuOpen } color='inherit'>
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

                { renderMobileMenu }
            </div>
        );
    };
}

export default withStyles(styles)(withRouter(TopBar));