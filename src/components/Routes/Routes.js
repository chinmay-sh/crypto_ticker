import React from 'react';
import {AppBar,Toolbar,IconButton,Typography,Button,Grid} from '@material-ui/core';
import logo from '../../logo.svg';
import './Routes.css';


function Routes(){

    return(
        <Grid container>
        <AppBar position="static">
        <Toolbar >
            <Grid item xs={2} sm={1} md={1}>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <a href="https://the-redlord.github.io/"><img src={logo} width="40px" /></a>
            </IconButton>
            </Grid>
            <Grid item xs={7} sm={10} md={10}>
            <Typography variant="h6">
            Crypto Ticker
            </Typography>
            </Grid>
            <Grid item xs={3} sm={1} md={1}>
            <Button color="inherit" href="https://github.com/the-redlord/crypto_ticker" target="_blank">GitHub</Button>
            </Grid>
        </Toolbar>
        </AppBar>
        </Grid>
    )
}

export default Routes;