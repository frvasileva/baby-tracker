import React from 'react';
import { useMutation } from "@apollo/client";
import Moment from 'react-moment';
import Datetime from 'react-datetime';
import { Form, FormGroup } from 'react-bootstrap';
import {
    DELETE_FOOD_ITEM_FOR_CHILD,
    FOOD_ITEMS_PER_CHILD,
    INSERT_FOOD_ITEM_FOR_CHILD,
    UPDATE_FOOD_ITEM_FOR_CHILD
} from '../../../graphql/queries';
import "./FoodItem.scss";
import { useRealmApp } from '../../../RealmApp';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';


function FoodItem(props: any) {
    const app = useRealmApp();
    const foodItem = props;

    const dtInputProps = {
        placeholder: 'Дата на въвеждане',
    };

    const [introductionDate, setIntroductionDate] = React.useState(foodItem.introductionDate ? new Date(foodItem.introductionDate) : new Date("02-02-2021"));
    const [showEditor, setEditorVisibility] = React.useState(false);

    const [isSelected, setIsSelected] = React.useState(foodItem.isSelected);
    const [insertFoodItem] = useMutation(INSERT_FOOD_ITEM_FOR_CHILD, { refetchQueries: [{ query: FOOD_ITEMS_PER_CHILD }] });
    const [updateFoodItem] = useMutation(UPDATE_FOOD_ITEM_FOR_CHILD);
    const [deleteFoodItem] = useMutation(DELETE_FOOD_ITEM_FOR_CHILD, { refetchQueries: [{ query: FOOD_ITEMS_PER_CHILD }] });

    const changeDate = (event: any) => {
        console.log("event", event._d);
        setIntroductionDate(event._d);
        setEditorVisibility(false);

        var ddd = event.toDate();

        updateFoodItem({
            variables: {
                foodId: foodItem._id,
                childId: app.currentUser.customData.children[0].$oid,
                introductionDate: ddd
            },
        });
    }

    const onChange = (event: any) => {
        if (event.target.checked) {
            var item = {
                createdOn: new Date(),
                introductionDate: new Date(),
                food: { link: event.target.name },
                child: { link: app.currentUser.customData.children[0].$oid } //TODO: get currently selected child
            };

            insertFoodItem({
                variables: {
                    input: item,
                }
            });

            setIsSelected(true);
            setIntroductionDate(new Date());
        }
        else {
            deleteFoodItem({
                variables: {
                    foodId: event.target.name,
                    childId: app.currentUser.customData.children[0].$oid
                },
            });

            setIsSelected(false);
        }
    }

    const toggleBtnClick = (event: any) => {
        setEditorVisibility(true);
    }

    return (
        <div className={isSelected ? "row food-item selected" : "row food-item"}>
            <div className="col-3">
                <div className="form-check">
                    {/* <Form.Check
                        type="checkbox"
                        id={foodItem.name + props.tabName}
                        name={foodItem._id}
                        label={foodItem.name}
                        onChange={onChange}
                        defaultChecked={foodItem.isSelected}
                    />
 */}
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked={foodItem.isSelected} />}
                            id={foodItem.name + props.tabName}
                            name={foodItem._id}
                            onChange={onChange}
                            label={foodItem.name} />
                    </FormGroup>
                </div>
            </div>
            <div className="col-4" style={{ display: isSelected ? "block" : "none" }}>
                <div className="date-given">
                    {
                        showEditor &&
                        <Datetime inputProps={dtInputProps} dateFormat="DD.MM.YYYY" initialValue={introductionDate}
                            onChange={changeDate} closeOnClickOutside={true}
                            closeOnSelect={true} className="date-time-input" value={introductionDate} timeFormat={false} />
                    }
                    {
                        !showEditor &&
                        <button type="button" className="edit-button" onClick={toggleBtnClick}>
                            <Moment format="DD.MM.YYYY" local>
                                {introductionDate}
                            </Moment><i className="far fa-edit"></i>
                        </button>
                    }
                </div>
            </div>

        </div >
    );
}

export default FoodItem;
