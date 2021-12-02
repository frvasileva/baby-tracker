
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom"
import { useLazyQuery } from '@apollo/client';
import { FIND_FOOD_BY_NAME } from '../../../graphql/queries';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
// import CachedIcon from '@mui/icons-material/Cached';
// import { white } from '@mui/material/colors';

function Search(props: any) {

    const [searchTerm, setSearchTerm] = useState("");
    const history = useHistory();

    const [getFood, { loading, data, error }] = useLazyQuery(FIND_FOOD_BY_NAME);

    useEffect(() => {
        if (data) {
            props.searchSubmitted(searchTerm);
        }
    }, [data])

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;
        setSearchTerm(value);
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        var url = "?searchTerm=" + searchTerm;
        history.push(url)
        getFood({ variables: { foodName: searchTerm } });
    }

    const clearSearch = (event: React.SyntheticEvent) => {
        setSearchTerm("");
        props.searchSubmitted("");
    }

    return <>
        <form onSubmit={handleSubmit} >
            <Grid container spacing={2} columns={12}>
                <Grid item md={8} xs={12}>
                    <TextField label="Продукт" fullWidth id="fullWidth" value={searchTerm} onChange={onChange} />
                </Grid>
                <Grid item md={2} xs={12}>
                    <Button variant="contained" size="large" type="submit" startIcon={loading ? <CircularProgress size={24} color="info"/> : <SearchIcon />} >Търси </Button>
                </Grid>
                <Grid item md={2} xs={12}>
                    {searchTerm !== "" &&
                        <Button variant="text" size="large" type="button" onClick={clearSearch} startIcon={<ClearIcon />} >Изчисти</Button>
                    }
                </Grid>
            </Grid>
        </form>
    </>
}

export default Search;