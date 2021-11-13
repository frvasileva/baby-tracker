import React from 'react';
import { useMutation } from "@apollo/client";
import { useState } from 'react';

import Moment from 'react-moment';
import Datetime from 'react-datetime';
import { Form } from 'react-bootstrap';
import {
    DELETE_FOOD_ITEM_FOR_CHILD,
    FOOD_ITEMS_PER_CHILD,
    INSERT_FOOD_ITEM_FOR_CHILD,
    UPDATE_FOOD_ITEM_FOR_CHILD
} from '../../../graphql/queries';
import "./FoodItem.scss";
import { useRealmApp } from '../../../RealmApp';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

function FoodItem(props: any) {
    const app = useRealmApp();
    const foodItem = props;

    const dtInputProps = {
        placeholder: 'Дата на въвеждане',
    };

    const [introductionDate, setIntroductionDate] = React.useState(foodItem.introductionDate ? new Date(foodItem.introductionDate) : new Date("02-02-2021"));
    const [showEditor, setEditorVisibility] = React.useState(false);

    const [isChecked, setIsSelected] = React.useState(foodItem.isSelected);
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
    const [checked, setChecked] = useState([1]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    return (
        <ListItem
            key={foodItem.name} className="food-item"
            secondaryAction={
                <div className="date-given" style={{ display: isChecked ? "block" : "none" }}>
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
            }
            disablePadding
        >
            <ListItemButton>
                <FormGroup>
                    <FormControlLabel control={
                        <Checkbox edge="end"
                            onChange={onChange}
                            checked={isChecked}
                            inputProps={{ 'aria-labelledby': foodItem.name }}
                            id={foodItem.name}
                            name={foodItem._id} 
                            color="success" className="custom-checkbox"/>}
                        label={foodItem.name} className="custom-label"/>
                </FormGroup>
            </ListItemButton>
        </ListItem>
    );
}

export default FoodItem;
