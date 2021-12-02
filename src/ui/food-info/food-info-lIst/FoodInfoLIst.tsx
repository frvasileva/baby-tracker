import { useEffect, useState } from 'react';
import { Layout } from '../../layout/Layout';
import FoodInfoTile from '../food-info-tile/FoodInfoTile';
import Grid from '@mui/material/Grid';
import { FIND_FOOD_BY_NAME, FOOD_ITEMS_TILE } from '../../../graphql/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import LoadingScreen from '../../layout/LoadingScreen';
import FoodFilters from '../food-filters/FoodFilters';
import { useHistory } from 'react-router-dom';

function FoodInfoList() {

    // const history = useHistory();
    // useEffect(() => {
    //     return history.listen((location) => {
    //         // if (location.search == "") {
    //         //     console.log('refetech executed');
    //         //     refetch();
    //         //     console.log(food?.foodItems);
    //         // }
    //     })
    // }, [history])

    const { data: foodList, error, loading, refetch } = useQuery(FOOD_ITEMS_TILE);
    const [getFood, { data: foodByName }] = useLazyQuery(FIND_FOOD_BY_NAME);

    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        setFoodItems(foodByName?.foodItems || foodList?.foodItems)
    }, [foodList, foodByName])

    if (loading || error)
        return <LoadingScreen />

    const searchSubmitted = (searchTerm: string) => {
        if (searchTerm) {
            getFood({ variables: { foodName: searchTerm } });
        } else {
            // refetch();
            setFoodItems(foodList.foodItems)
        }
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