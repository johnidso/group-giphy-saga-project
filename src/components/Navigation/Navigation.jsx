import { AppBar, Button, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { HashRouter as Router, Route, Link} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';

function Navigation() {

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        }
      }));

      const classes = useStyles();

      const [anchorEl, setAnchorEl] = useState(null);

      const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
      }

      const handleClose = () => {
          setAnchorEl(null);
      }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        onClick={handleClick}
                        color="inherit" 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Router>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link to="/">Search</Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link to="/favorites">Favorites</Link>
                            </MenuItem>
                        </Menu>
                    </Router>
                    <Typography variant="h6" className={classes.title}>
                        Powered by GIPHY
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* <Router >
                <h1>Giphy Search!</h1>
                <nav>
                    <ul>
                    <li>
                        <Link to="/">Search</Link>
                    </li>
                    <li>
                        <Link to="/favorites">Favorites</Link>
                    </li>
                    </ul>
                </nav>
            </Router> */}
        </div>
    );   
}

export default Navigation;