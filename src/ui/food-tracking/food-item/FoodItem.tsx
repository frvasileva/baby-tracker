import React from 'react';

function FoodItem(props: any) {

    console.log(props);

    return (
        <div className="food-item">
            {props.name}
        </div>
    );
}

export default FoodItem;
