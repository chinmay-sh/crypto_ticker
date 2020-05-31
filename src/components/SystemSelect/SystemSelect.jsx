import React from 'react';
import {Select,MenuItem,InputLabel,Grid} from '@material-ui/core';

function SystemSelect(props){

    const handleSystemChange = (event) => {
        props.onChange(event.target.value);
      };
    

    return(
        <Grid container spacing={2}>
                <Grid item xs={4} style={{margin:"auto"}}>
                    <InputLabel id="system-select-label">System</InputLabel>
                </Grid>
                <Grid item xs={8} style={{margin:"auto"}}>
                    <Select
                    labelId="system-select-label"
                    id="system-select"
                    value={props.system}
                    onChange={handleSystemChange}
                    >
                    <MenuItem value={'cryptocompare'}>Cryptocompare</MenuItem>
                    <MenuItem value={'coinlore'}>Coinlore</MenuItem>
                    </Select>
                </Grid>
        </Grid>
        
    )
}

export default SystemSelect;