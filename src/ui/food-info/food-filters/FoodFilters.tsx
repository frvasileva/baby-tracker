import * as React from 'react';
import { useState } from 'react';

import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'зеленчуци',
    'плодове',
    'зърнени',
    'месо'
];


function FoodFilters() {

    const [foodGroups, setFoodGroups] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof foodGroups>) => {
        const {
            target: { value },
        } = event;
        setFoodGroups(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    return (<>

        <Grid container spacing={2}>
            <Grid item xs={10}>
                <TextField fullWidth label="Продукт" id="fullWidth" />
            </Grid>
            <Grid item xs={2}>
                <Button variant="outlined" size="large">Търси</Button>
            </Grid>
            <Grid item xs={4}>

                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={foodGroups}
                        onChange={handleChange}
                        input={<OutlinedInput label="Групи храни" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={foodGroups.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={8}>
            </Grid>
        </Grid>
    </>)
}

export default FoodFilters;