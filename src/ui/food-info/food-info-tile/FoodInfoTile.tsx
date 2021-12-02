import "./FoodInfo.scss";

function FoodInfoTile(props: any) {

    var item = props.item;

    return (
        <div className="food-info-tile-wrapper" key={item.friendlyUrl}>
            <a href={"/foods/" + item.friendlyUrl} className="link">
                <img src={item.productImage ? item.productImage : "https://pikveel.com/img/cat_icon/2.svg"} width="200px" alt={item.name} />
                <p className="food-name">{item.name}</p>
            </a>
        </div>
    )
}

export default FoodInfoTile;