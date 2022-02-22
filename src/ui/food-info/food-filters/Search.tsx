
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom"
import { useLazyQuery } from '@apollo/client';
import { FIND_FOOD_BY_NAME } from '../../../graphql/queries';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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
            <div className="row">
                <div className='col-md-8'>
                    <TextField label="Food" fullWidth id="fullWidth" value={searchTerm} onChange={onChange} />
                </div>
                <div className='col-md-2'>
                    <Button variant="contained" size="large" type="submit" startIcon={loading ? <CircularProgress size={24} color="info" className="search-btn" /> : <SearchIcon />} >Search </Button>
                </div>
                <div className='col-md-2'>
                    {searchTerm !== "" &&
                        <Button variant="text" size="large" type="button" onClick={clearSearch} startIcon={<ClearIcon />} >Clear</Button>
                    }
                </div>
            </div>
        </form>
    </>
}

export default Search;