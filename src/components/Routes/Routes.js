import React from 'react';
import {AppBar,Toolbar,IconButton,Typography,Button,Grid,SvgIcon} from '@material-ui/core';
import logo from '../../logo.svg';
import './Routes.css';


function Router(){

    return(
        <Grid container>
        <AppBar position="static">
        <Toolbar className="tool">
            <Grid item xs={2} sm={1} md={1}>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <img src={logo} width="40px"/>
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

export default Router;