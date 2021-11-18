import { Layout } from '../../layout/Layout';
import FoodInfoTile from '../food-info-tile/FoodInfoTile';
import Grid from '@mui/material/Grid';
import { FOOD_ITEMS_TILE } from '../../../graphql/queries';
import { useQuery } from '@apollo/client';
import LoadingScreen from '../../layout/LoadingScreen';
import FoodFilters from '../food-filters/FoodFilters';
function FoodInfoList() {

    const foodItems = useQuery(FOOD_ITEMS_TILE);
    if (foodItems.loading || foodItems.error)
        return <LoadingScreen />

    return (
        <Layout>
            <FoodFilters />
            <Grid container spacing={2}>
                {foodItems.data.foodItems.map((itm: any) => {
                    return <>
                        <Grid item xs={6} md={3} key={itm.name}>
                            <FoodInfoTile item={itm} key={itm.name} />
                        </Grid></>
                })}
            </Grid>
        </Layout>
    )
}

export default FoodInfoList;