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

const foodGroupNames = [
    { label: 'зеленчуци', value: "vegetable" },
    { label: 'плодове', value: "fruit" },
    { label: 'зърнени', value: "grain" },
    { label: 'млечни', value: "dairy" },
    { label: 'семена', value: "sead" },
    { label: 'разни', value: "other" },

];
const suggestionAge = [
    { label: '6+ месеца', value: "6m" },
    { label: '7+ месеца', value: "7m" },
    { label: '8+ месеца', value: "8m" },
    { label: '9+ месеца', value: "9m" },
    { label: '10+ месеца', value: "10m" },
    { label: '11+ месеца', value: "11m" },
    { label: '12+ месеца', value: "12m" },
];


function FoodFilters() {

    const [foodGroups, setFoodGroups] = useState<string[]>([]);
    const [suggestionAges, setSuggestionAge] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof foodGroups | typeof suggestionAges>) => {

        console.log("handle change foodGroups", foodGroups);
        const {
            target: { value },
        } = event;
        setFoodGroups(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleAgeChange = (event: SelectChangeEvent<typeof suggestionAges>) => {
        const {
            target: { value },
        } = event;
        setSuggestionAge(
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
                    <InputLabel id="foodGroupLabel">Групи храни</InputLabel>
                    <Select
                        labelId="foodGroupLabel"
                        id="foodGroupCheckbox"
                        multiple
                        value={foodGroups}
                        onChange={handleChange}
                        input={<OutlinedInput label="Групи храни" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {foodGroupNames.map((item) => (
                            <MenuItem key={item.value} value={item.label}>
                                <Checkbox checked={foodGroups.indexOf(item.label) > -1} />
                                <ListItemText primary={item.label} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="ageSuggestionLabel">Възраст</InputLabel>
                        <Select
                            labelId="ageSuggestionLabel"
                            id="foodGroupCheckbox"
                            multiple
                            value={suggestionAges}
                            onChange={handleAgeChange}
                            input={<OutlinedInput label="Възраст за въвеждане" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {suggestionAge.map((item) => (
                                <MenuItem key={item.value} value={item.label}>
                                    <Checkbox checked={suggestionAges.indexOf(item.label) > -1} />
                                    <ListItemText primary={item.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    </>)
}

export default FoodFilters;