import React from 'react';
import axios from 'axios';
import {Card,CardContent,Typography,CardActions,Button,CardMedia} from '@material-ui/core';

export default function Coin(props){
    return(
        <Card style={{display:"flex",backgroundColor:"rgba(51,41,64,0.9)",color:"#FFF"}}>
            <CardMedia
                title={props.coin}
                style={{margin:"auto 10px auto 10px"}}
            >
                <img src={`https://www.cryptocompare.com${props.imgUrl}`} height="60px" width="60px"/>
            </CardMedia>
        <CardContent style={{display:"flex",flexDirection:"column",margin:"1%",width:"60%"}}>
            
            <Typography variant="h5" component="h2">
                {props.coin}
            </Typography>
            <Typography  color="secondary">
                USD: {props.usd}
            </Typography>
            <Typography variant="body2" component="p">
                INR: {props.inr}
            <br />
                CAD: {props.cad}
            </Typography>
            <CardActions>
                <Button size="small" disableElevation="false" href={`https://www.cryptocompare.com/coins/${props.coin}`} target="_blank" color="primary">Learn More</Button>
            </CardActions>
        </CardContent>
        <CardMedia
                title={props.coin}
                style={{margin:"auto 20px auto 10px"}}
            >
                <img src={props.statusImg} height="50px" width="50px"/>
            </CardMedia>
    
        </Card>
    );

}