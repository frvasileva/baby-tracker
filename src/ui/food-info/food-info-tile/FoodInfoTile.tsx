import { FoodInfo } from "../../../types/types";
import "./FoodInfo.scss";

function FoodInfoTile(props: { item: FoodInfo }) {
    var item = props.item;
    return (
        <div className="food-info-tile-wrapper" key={item.friendlyUrl}>
            <a href={"/foods/" + item.friendlyUrl} className="link">
                <img src={item.productImage ? item.productImage : "https://pikveel.com/img/cat_icon/2.svg"} className="food-tile-image" alt={item.name} />
                <p className="food-name">{item.name}</p>
                <p className="food-age">{item.suggestionAge}</p>
            </a>
        </div>
    )
}

export default FoodInfoTile;