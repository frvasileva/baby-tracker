import React from 'react';
import "./FoodItem.scss";

function FoodItem(props: any) {

    console.log(props);

    return (
        <div className="row food-item">
            <div className="col-3">

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id={props.name} name={props.name} />
                    <label className="form-check-label" htmlFor={props.name}>
                        {props.name}
                    </label>
                </div>
            </div>
            <div className="col">
                <div className="date-given">
                    <button type="button" className="btn btn-dark">Date</button>
                </div>
            </div>

        </div>
    );
}

export default FoodItem;
