import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class SideNav extends React.Component {
    render() {
        return (
            <List component='nav'
                  className={ `side-nav` }>
                <ListItem button>
                    <ListItemText primary='Dresses' />
                </ListItem>
                <ListItem button>
                    <ListItemText primary='Skirts' />
                </ListItem>
                <ListItem button>
                    <ListItemText primary='Jackets' />
                </ListItem>
                <ListItem button>
                    <ListItemText primary='Blouses' />
                </ListItem>
                <ListItem button>
                    <ListItemText primary='Pants' />
                </ListItem>
                <ListItem button>
                    <ListItemText primary='Shorts' />
                </ListItem>
                <ListItem button>
                    <ListItemText primary='Ponchos' />
                </ListItem>
                <ListItem button>
                    <ListItemText primary='Scarves' />
                </ListItem>
            </List>
        );
    }
}

export default SideNav;