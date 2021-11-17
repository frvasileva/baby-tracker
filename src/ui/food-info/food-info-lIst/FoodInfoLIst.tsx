import { Layout } from '../../layout/Layout';
import FoodInfoTile from '../food-info-tile/FoodInfoTile';
import Grid from '@mui/material/Grid';
import { FOOD_ITEMS_TILE } from '../../../graphql/queries';
import { useQuery } from '@apollo/client';
import LoadingScreen from '../../layout/LoadingScreen';
function FoodInfoList() {


    const foodItems = useQuery(FOOD_ITEMS_TILE);
    if (foodItems.loading || foodItems.error)
        return <LoadingScreen />

   
    return (
        <Layout>

            <Grid container spacing={2}>
                {foodItems.data.foodItems.map((itm: any) => {
                    return <>
                        <Grid item xs={6} md={3}>
                            <FoodInfoTile item={itm} />
                        </Grid></>
                })}
            </Grid>


        </Layout>
    )
}

export default FoodInfoList;