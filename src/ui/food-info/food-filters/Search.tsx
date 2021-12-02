
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom"
import { useLazyQuery } from '@apollo/client';
import { FIND_FOOD_BY_NAME } from '../../../graphql/queries';
import CircularProgress from '@mui/material/CircularProgress';

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
        <Grid >
            <form onSubmit={handleSubmit} >
                <Grid item xs={8}>
                    <TextField fullWidth label="Продукт" id="fullWidth" value={searchTerm} onChange={onChange} />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="outlined" size="large" type="submit">Търси{loading && <CircularProgress />} </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="outlined" size="large" type="button" onClick={clearSearch}>Изчисти</Button>
                </Grid>
            </form></Grid>
    </>
}

export default Search;