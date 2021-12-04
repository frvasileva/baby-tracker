import { useEffect, useState } from 'react';
import { Layout } from '../../layout/Layout';
import FoodInfoTile from '../food-info-tile/FoodInfoTile';
import { FIND_FOOD_BY_NAME, FOOD_ITEMS_TILE } from '../../../graphql/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import LoadingScreen from '../../layout/LoadingScreen';
import FoodFilters from '../food-filters/FoodFilters';
import "./FoodInfoLIst.scss";
import { FoodInfo } from '../../../types/types';

function FoodInfoList() {

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

            <div className="row food-items-wrapper">
                {foodItems?.map((itm: FoodInfo) => {
                    return <>
                        <div className="col-lg-3 col-md-4 col-xs-12">
                            <FoodInfoTile item={itm} key={itm.name} />
                        </div>
                    </>
                })}
            </div>

        </Layout>
    )
}

export default FoodInfoList;