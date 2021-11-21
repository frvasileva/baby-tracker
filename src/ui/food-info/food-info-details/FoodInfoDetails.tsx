import { useQuery } from "@apollo/client";
import { FOOD_ITEM_INFO_DETAILS } from "../../../graphql/queries";
import { Layout } from "../../layout/Layout";
import LoadingScreen from "../../layout/LoadingScreen";

function FoodInfoDetails(props: any) {

    const foodDetails = useQuery(FOOD_ITEM_INFO_DETAILS, {
        variables: {
            friendlyUrl: props.match.params.friendlyUrl,
        },
    });

    if (foodDetails.loading || foodDetails.error)
        return <LoadingScreen />

    console.log("info", foodDetails.data);
    var item = foodDetails.data.foodItem;
    console.log("item", item);
    return (<Layout>
        <h1 className="food-name">{item.name}</h1>

        <img src={item.productImage ? item.productImage : "https://pikveel.com/img/cat_icon/2.svg"} width="200px" alt={item.name} />
        <p>{item.description}</p>
    </Layout>)
}

export default FoodInfoDetails;