import React from 'react';
import { useMutation } from "@apollo/client";
import Moment from 'react-moment';
import Datetime from 'react-datetime';
import { Form } from 'react-bootstrap';
import { DELETE_FOOD_ITEM_FOR_CHILD, FOOD_ITEMS_PER_CHILD, INSERT_FOOD_ITEM_FOR_CHILD } from '../../../graphql/queries';
import "./FoodItem.scss";
import { useRealmApp } from '../../../RealmApp';


function FoodItem(props: any) {

    const app = useRealmApp();
    const foodItem = props;

    const dtInputProps = {
        placeholder: 'Дата на въвеждане',
    };

    const [introductionDate, setIntroductionDate] = React.useState(foodItem?.introductionDate ?? new Date());
    const [showEditor, setEditorVisibility] = React.useState(false);

    const changeDate = (event: any) => {
        setIntroductionDate(event.toDate());
        setEditorVisibility(false);
    }


    const [isSelected, setIsSelected] = React.useState(foodItem.isSelected);
    const [insertFoodItem] = useMutation(INSERT_FOOD_ITEM_FOR_CHILD, { refetchQueries: [{ query: FOOD_ITEMS_PER_CHILD }] });
    const [deleteFoodItem] = useMutation(DELETE_FOOD_ITEM_FOR_CHILD, { refetchQueries: [{ query: FOOD_ITEMS_PER_CHILD }] });


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
                },
                // update: (cache, { data }) => {
                //     var dt = data.insertOneChildFoodItem;

                //     const existingItems = cache.readQuery({
                //         variables: { childId: app.currentUser.customData.children[0].$oid },
                //         query: FOOD_ITEMS_PER_CHILD as any,
                //     }) as any;

                //     var updatedItems = [...existingItems.childFoodItems, dt];
                //     cache.writeQuery({
                //         query: FOOD_ITEMS_PER_CHILD as any,
                //         variables: { childId: app.currentUser.customData.children[0].$oid },
                //         data: { ...existingItems, childFoodItems: updatedItems }
                //     });
                // },
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

    var introDate = foodItem.introductionDate ? foodItem.introductionDate.toString("MM-dd") : introductionDate;

    const toggleBtnClick = (event: any) => {
        setEditorVisibility(true);
    }

    return (
        <div className={isSelected ? "row food-item selected" : "row food-item"}>
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
            <div className="col-4" style={{ display: isSelected ? "block" : "none" }}>
                <div className="date-given">


                    <Moment parse="YYYY-MM-DD" format="DD-MM-YYYY">
                        {introductionDate}
                    </Moment>
                    <button type="button" className="edit-button" onClick={toggleBtnClick}><i className="far fa-edit"></i></button>
                    {
                        showEditor &&
                        <Datetime inputProps={dtInputProps} dateFormat="MM-DD-YYYY" initialValue={foodItem.introductionDate}
                            onChange={changeDate} closeOnClickOutside={true}
                            closeOnSelect={true} className="date-time-input" value={introDate} timeFormat={false} />
                    }
                </div>
            </div>

        </div >
    );
}

export default FoodItem;
