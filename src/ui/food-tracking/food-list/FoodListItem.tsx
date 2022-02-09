import { List } from "@mui/material";
import { FoodItemPerChildTracker } from "../../../types/types";
import FoodItem from "../food-item/FoodItem";

function FoodListItem(props: { items: FoodItemPerChildTracker[] }) {

    const items = props.items;
    return <>
        <List sx={{ width: '80%', maxWidth: 500 }}>
            {
                items.map((item: any) => <FoodItem item={item} key={item.name} />)
            }
        </List>
    </>
}

export default FoodListItem;