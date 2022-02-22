import { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from "react-router-dom"
import Search from './Search';
import Button from '@mui/material/Button';
import { useLazyQuery } from '@apollo/client';
import { FILTER_PRODUCTS_BY_AGE_AND_TYPE } from '../../../graphql/queries';

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
    { label: 'vegetbles', value: "vegetables" },
    { label: 'fruits', value: "fruit" },
    { label: 'grain', value: "grain" },
    { label: 'dairy', value: "dairy" },
    { label: 'seed', value: "seed" },
    { label: 'other', value: "other" },

];
const suggestionAge = [
    { label: '6+ months', value: 6 },
    { label: '7+ months', value: 7 },
    { label: '8+ months', value: 8 },
    { label: '9+ months', value: 9 },
    { label: '10+ months', value: 10 },
    { label: '11+ months', value: 11 },
    { label: '12+ months', value: 12 },
];


function FoodFilters(props: any) {

    const history = useHistory()
    var [selectedFoodGroups, setFoodGroups] = useState<string[]>([]);
    var [selectedSuggestionAges, setSuggestionAge] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof selectedFoodGroups>) => {
        const { target: { value } } = event;
        setFoodGroups(typeof value === 'string' ? value.split(',') : value);
    };

    const handleAgeChange = (event: SelectChangeEvent<typeof selectedSuggestionAges>) => {
        const { target: { value } } = event;
        setSuggestionAge(typeof value === 'string' ? value.split(',') : value);
    };

    const searchSubmitted = (searchTerm: string, selectedFoods: string, selectedAge: string, isFilter?: boolean) => {
        props.searchSubmitted(searchTerm, isFilter);
    }

    const [filterFood, { loading, data, error }] = useLazyQuery(FILTER_PRODUCTS_BY_AGE_AND_TYPE);

    const submitFilters = () => {

        var selectedFoods = foodGroupNames.filter(item => selectedFoodGroups.includes(item.label)).map(item => item.value);
        var selectedAge = suggestionAge.filter(item => selectedSuggestionAges.includes(item.label)).map(item => item.value);
        var url = "";
        if (selectedFoods.length > 0) {
            url = "?food=" + selectedFoods.join(',');
        }
        if (selectedAge.length > 0) {
            var paramSeparator = selectedFoods.length > 0 ? "&" : "?";
            url = url + paramSeparator + "age=" + selectedAge.join(',');
        }


        history.push(url);
        var searchTerm = "";
        props.searchSubmitted(searchTerm, selectedFoods, selectedAge, true);

    }

    return (<>

        <Search searchSubmitted={searchSubmitted} />
        <br />
        <p>Филтрирай:</p>
        <div className="row">
            <div className="col-md-4 col-xs-12">
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="foodGroupLabel">Food groups</InputLabel>
                    <Select
                        labelId="foodGroupLabel"
                        id="foodGroupCheckbox"
                        multiple
                        value={selectedFoodGroups}
                        onChange={handleChange}
                        input={<OutlinedInput label="Food groups" />}
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
            </div>
            <div className="col-md-4  col-xs-12">
                <FormControl sx={{ width: 300 }} className='form-control-test'>
                    <InputLabel id="ageSuggestionLabel">Age</InputLabel>
                    <Select
                        labelId="ageSuggestionLabel"
                        id="foodGroupCheckbox"
                        multiple
                        value={selectedSuggestionAges}
                        onChange={handleAgeChange}
                        input={<OutlinedInput label="Introduction age" />}
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
            </div>
            <div className="col-md-4  col-xs-12">
                <Button variant="contained" size="large" type="submit" onClick={submitFilters}>Filter </Button>

            </div>
        </div>
    </>)
}

export default FoodFilters;