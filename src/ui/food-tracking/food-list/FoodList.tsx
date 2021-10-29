import { useQuery } from '@apollo/client';
import { FOOD_ITEMS } from '../../../graphql/queries';
import FoodItem from '../food-item/FoodItem';
import './FoodList.scss';

function FoodList() {

    const foodItems = useQuery(FOOD_ITEMS);

    if (foodItems.loading || foodItems.error)
        return <div>Loading</div>

    const items = foodItems.data.foodItems;
    console.log("items", items);

    return (
        <div className="food-list-wrapper">
            Food list:
            {
                items.map((item: any) => <FoodItem {...item} key={item.name} />)
            }
        </div>
    );
}

export default FoodList;
