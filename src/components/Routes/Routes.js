import React from 'react';
import {AppBar,Toolbar,IconButton,Typography,Button,Grid} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './Routes.css';

function Router(){

    return(
        <Grid container>
        <AppBar position="static">
        <Toolbar className="tool">
            <Grid item xs={2} sm={1} md={1}>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            </Grid>
            <Grid item xs={7} sm={10} md={10}>
            <Typography variant="h6">
            Crypto Ticker
            </Typography>
            </Grid>
            <Grid item xs={3} sm={1} md={1}>
            <Button color="inherit" className="but">Login</Button>
            </Grid>
        </Toolbar>
        </AppBar>
        </Grid>
    )
}

export default Router;