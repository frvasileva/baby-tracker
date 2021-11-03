import React from 'react';
import "./FoodItem.scss";
import Datetime from 'react-datetime';

function FoodItem(props: any) {

    const dtInputProps = {
        placeholder: 'Изберете дата',
    };


    const [birthdate, setBirthDate] = React.useState();
    const [isOpen, setIsOpen] = React.useState(false);

    const changeDate = (event: any) => {

        setBirthDate(event.toDate());
    }

    const openCalendar = (event: any) => {
        setIsOpen(true);
    }

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
            <div className="col-2">
                <div className="date-given">
                    <button type="button" className="btn btn-dark" onClick={openCalendar}>Date</button>
                </div>
            </div>
            <div className="col-4">
                <div className="date-given">
                    <Datetime inputProps={dtInputProps} dateFormat="MM-DD-YYYY" onChange={changeDate} closeOnClickOutside={true} open={isOpen} closeOnSelect={true} />
                </div>
            </div>

        </div>
    );
}

export default FoodItem;
