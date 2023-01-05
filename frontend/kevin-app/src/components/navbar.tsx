import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: 'white',
        textDecoration: 'none',
      },
    button: {
        padding: theme.spacing(2.5),
      },
}));

const ButtonAppBar: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <Link to="/"  className={classes.link}>
                  <Button color="inherit"className={classes.button} startIcon={<Icon>list</Icon>}>Show Users</Button>
                </Link>
                <Link to="/create"  className={classes.link}>
                  <Button color="inherit" className={classes.button} startIcon={<Icon>add</Icon>}>Create</Button>
                </Link>
                <Link to="/upload"  className={classes.link}>
                  <Button color="inherit" className={classes.button} startIcon={<Icon>cloud_upload</Icon>}>Upload</Button>
                </Link>
                <Link to="/update"  className={classes.link}>
                  <Button color="inherit" className={classes.button} startIcon={<Icon>update</Icon>}>Update</Button>
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      );
}

export default ButtonAppBar;
