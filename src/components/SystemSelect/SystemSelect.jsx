import React from 'react';
import {FormControl,Select,MenuItem,InputLabel} from '@material-ui/core';

function SystemSelect(props){

    const handleSystemChange = (event) => {
        props.onChange(event.target.value);
      };
    

    return(
        <FormControl>
            <InputLabel id="system-select-label">System</InputLabel>
                <Select
                labelId="system-select-label"
                id="system-select"
                value={props.system}
                onChange={handleSystemChange}
                >
                <MenuItem value={'cryptocompare'}>Cryptocompare</MenuItem>
                <MenuItem value={'coinlore'}>Coinlore</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SystemSelect;