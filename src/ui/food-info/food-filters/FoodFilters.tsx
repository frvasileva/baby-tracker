import { useEffect, useState } from 'react';
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
import { useHistory } from "react-router-dom"
import Search from './Search';

const ITEM_HEIGHT = 68;
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

function FoodFilters(props: any) {
    const history = useHistory()
    var [selectedFoodGroups, setFoodGroups] = useState<string[]>([]);
    var [selectedSuggestionAges, setSuggestionAge] = useState<string[]>([]);

    useEffect(() => {

        var selectedFoods = foodGroupNames.filter(item => selectedFoodGroups.includes(item.label)).map(item => item.value);
        var selectedAges = suggestionAge.filter(item => selectedSuggestionAges.includes(item.label)).map(item => item.value);
        var url = "";
        if (selectedFoods.length > 0) {
            url = "?food=" + selectedFoods.join(',');
        }
        if (selectedAges.length > 0) {
            var paramSeparator = selectedFoods.length > 0 ? "&" : "?";
            url = url + paramSeparator + "age=" + selectedAges.join(',');
        }
        history.push(url)

    }, [selectedSuggestionAges, selectedFoodGroups]);

    const handleChange = (event: SelectChangeEvent<typeof selectedFoodGroups>) => {
        const { target: { value } } = event;
        setFoodGroups(typeof value === 'string' ? value.split(',') : value);
    };

    const handleAgeChange = (event: SelectChangeEvent<typeof selectedSuggestionAges>) => {
        const { target: { value } } = event;
        setSuggestionAge(typeof value === 'string' ? value.split(',') : value);
    };

    const searchSubmitted = (searchTerm: string) => {
        console.log("searchTerm", searchTerm);
        props.searchSubmitted(searchTerm);
    }
    return (<>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Search searchSubmitted={searchSubmitted}/>
            </Grid>
            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="foodGroupLabel">Групи храни</InputLabel>
                    <Select
                        labelId="foodGroupLabel"
                        id="foodGroupCheckbox"
                        multiple
                        value={selectedFoodGroups}
                        onChange={handleChange}
                        input={<OutlinedInput label="Групи храни" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {foodGroupNames.map((item) => (
                            <MenuItem key={item.value} value={item.label}>
                                <Checkbox checked={selectedFoodGroups.indexOf(item.label) > -1} />
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
                            value={selectedSuggestionAges}
                            onChange={handleAgeChange}
                            input={<OutlinedInput label="Възраст за въвеждане" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {suggestionAge.map((item) => (
                                <MenuItem key={item.value} value={item.label}>
                                    <Checkbox checked={selectedSuggestionAges.indexOf(item.label) > -1} />
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