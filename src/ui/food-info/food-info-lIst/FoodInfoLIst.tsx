import { useEffect, useState } from 'react';
import { Layout } from '../../layout/Layout';
import FoodInfoTile from '../food-info-tile/FoodInfoTile';
import Grid from '@mui/material/Grid';
import { FOOD_ITEMS_TILE } from '../../../graphql/queries';
import { useQuery } from '@apollo/client';
import LoadingScreen from '../../layout/LoadingScreen';
import FoodFilters from '../food-filters/FoodFilters';

function FoodInfoList() {

    const { data, error, loading } = useQuery(FOOD_ITEMS_TILE);
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        setFoodItems(data?.foodItems)
    }, [data])


    if (loading || error)
        return <LoadingScreen />


    const searchSubmitted = (data: any) => {
        setFoodItems(data.foodItems)
    }

    return (
        <Layout>
            <FoodFilters searchSubmitted={searchSubmitted} />
            {
                <Grid container spacing={2}>
                    {foodItems?.map((itm: any) => {
                        return <div key={itm.name}>
                            <Grid item xs={6} md={3} >
                                <FoodInfoTile item={itm} key={itm.name} />
                            </Grid>
                        </div>
                    })}
                </Grid>
            }
        </Layout>
    )
}

export default FoodInfoList;