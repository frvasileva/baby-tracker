import React from 'react';
import { useMutation, useQuery } from "@apollo/client";
import "./FoodItem.scss";
import Datetime from 'react-datetime';
import { Form } from 'react-bootstrap';
import { DELETE_FOOD_ITEM_FOR_CHILD, INSERT_FOOD_ITEM_FOR_CHILD } from '../../../graphql/queries';
import { useRealmApp } from '../../../RealmApp';

function FoodItem(props: any) {

    const app = useRealmApp();

    // const dtInputProps = {
    //     placeholder: 'Изберете дата',
    // };

    // console.log("props", props);
    // const [birthdate, setBirthDate] = React.useState();
    // const [isOpen, setIsOpen] = React.useState(false);

    // const changeDate = (event: any) => {

    //     setBirthDate(event.toDate());
    // }

    // const openCalendar = (event: any) => {
    //     setIsOpen(true);
    // }

    console.log(props);
    const foodItem = props;
    const [insertFoodItem] = useMutation(INSERT_FOOD_ITEM_FOR_CHILD);
    const [deleteFoodItem] = useMutation(DELETE_FOOD_ITEM_FOR_CHILD);


    const onChange = (event: any) => {
        if (event.target.checked) {
            var item = {
                createdOn: new Date(),
                food: { link: event.target.name },
                child: { link: app.currentUser.customData.children[0].$oid } //TODO: get currently selected child
            };

            insertFoodItem({
                variables: {
                    input: item,
                },
            });
        }
        else {
            deleteFoodItem({
                variables: {
                    foodId: event.target.name,
                    childId: app.currentUser.customData.children[0].$oid
                },
            });
        }
    }

    return (
        <div className="row food-item">
            <div className="col-3">
                <div className="form-check">
                    <Form.Check
                        type="checkbox"
                        id={foodItem.name + props.tabName}
                        name={foodItem._id}
                        label={foodItem.name}
                        onChange={onChange}
                        defaultChecked={foodItem.isSelected}
                    />
                </div>
            </div>
            {/* <div className="col-2">
                <div className="date-given">
                    <button type="button" className="btn btn-dark" onClick={openCalendar}>Date</button>
                </div>
            </div>
            <div className="col-4">
                <div className="date-given">
                    <Datetime inputProps={dtInputProps} dateFormat="MM-DD-YYYY" onChange={changeDate} closeOnClickOutside={true} open={isOpen} closeOnSelect={true} />
                </div>
            </div> */}

        </div>
    );
}

export default FoodItem;
