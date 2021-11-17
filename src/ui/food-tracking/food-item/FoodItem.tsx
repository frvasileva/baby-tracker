import React from 'react';
import { useMutation } from "@apollo/client";
import Moment from 'react-moment';
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
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

function FoodItem(props: any) {
    const app = useRealmApp();
    const foodItem = props;

    const [introductionDate, setIntroductionDate] = React.useState(foodItem.introductionDate ? new Date(foodItem.introductionDate) : new Date("02-02-2021"));
    const [showEditor, setEditorVisibility] = React.useState(false);

    const [isChecked, setIsSelected] = React.useState(foodItem.isSelected);
    const [insertFoodItem] = useMutation(INSERT_FOOD_ITEM_FOR_CHILD, { refetchQueries: [{ query: FOOD_ITEMS_PER_CHILD }] });
    const [updateFoodItem] = useMutation(UPDATE_FOOD_ITEM_FOR_CHILD);
    const [deleteFoodItem] = useMutation(DELETE_FOOD_ITEM_FOR_CHILD, { refetchQueries: [{ query: FOOD_ITEMS_PER_CHILD }] });

    const changeDate = (event: any) => {
        setIntroductionDate(event);
        setEditorVisibility(false);

        updateFoodItem({
            variables: {
                foodId: foodItem._id,
                childId: app.currentUser.customData.children[0].$oid,
                introductionDate: new Date(event)
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

    const toggleBtnClick = () => {
        setEditorVisibility(true);
    }

    return (
        <ListItem
            key={foodItem.name} className="food-item"
            secondaryAction={
                <div className="date-given" style={{ display: isChecked ? "block" : "none" }}>
                    {
                        showEditor &&
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Дата на въвеждане"
                                value={introductionDate}
                                onChange={changeDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
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
                            color="success" className="custom-checkbox" />}
                        label={foodItem.name} className="custom-label" />
                </FormGroup>
            </ListItemButton>
        </ListItem>
    );
}

export default FoodItem;
