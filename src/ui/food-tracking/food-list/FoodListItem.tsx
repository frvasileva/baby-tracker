import { List } from "@mui/material";
import { FoodItemPerChildTracker } from "../../../types/types";
import FoodItem from "../food-item/FoodItem";

function FoodListItem(props: { items: FoodItemPerChildTracker[] }) {

    const items = props.items;
    console.log("items props", items);
    return <>
        <List sx={{ width: '80%', maxWidth: 500, bgcolor: '#eceff1' }}>
            {
                items.map((item: any) => <FoodItem item={item} key={item.name} />)
            }
        </List>
    </>
}

export default FoodListItem;