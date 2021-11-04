import { useQuery } from '@apollo/client';
import { Tab, Tabs } from 'react-bootstrap';
import { FOOD_ITEMS, FOOD_ITEMS_PER_CHILD } from '../../../graphql/queries';
import { Layout } from '../../layout/Layout';
import FoodItem from '../food-item/FoodItem';
import './FoodList.scss';
import Datetime from 'react-datetime';
import { useRealmApp } from '../../../RealmApp';

function FoodList() {
    const app = useRealmApp();

    const foodItems = useQuery(FOOD_ITEMS);
    const foodItemsPerChild = useQuery(FOOD_ITEMS_PER_CHILD, {
        variables: {
            childId: app.currentUser.customData.children[0].$oid
        }
    });

    if (foodItems.loading || foodItems.error || foodItemsPerChild.loading || foodItemsPerChild.error)
        return <div>Loading</div>


    const fItemsPerChild = foodItemsPerChild.data.childFoodItems;
    const items = foodItems.data.foodItems.map((item: any) => ({ ...item, isSelected: fItemsPerChild.some((itm: any) => itm.food._id === item._id) }))

    var vegetables = items.filter((item: any) => item.foodGroup === "vegetables");
    var fruits = items.filter((item: any) => item.foodGroup === "fruits");
    var dairy = items.filter((item: any) => item.foodGroup === "dairy");
    var grain = items.filter((item: any) => item.foodGroup === "grain");
    var meat = items.filter((item: any) => item.foodGroup === "meat");
    var other = items.filter((item: any) => item.foodGroup === "other");

    return (
        <Layout>
            <div className="food-list-wrapper">
                <Tabs defaultActiveKey="all" id="food-list-tabs" className="mb-3">
                    <Tab eventKey="all" title="Всички">
                        {
                            items.map((item: any) => <FoodItem {...item} key={item.name} tabName="all"/>)
                        }
                    </Tab>
                    <Tab eventKey="vegetables" title="Зеленчуци">
                        {
                            vegetables.map((item: any) => <FoodItem {...item} key={item.name} />)
                        }
                    </Tab>
                    <Tab eventKey="fruits" title="Плодове">
                        {
                            fruits.map((item: any) => <FoodItem {...item} key={item.name} />)
                        }
                    </Tab>
                    <Tab eventKey="meat" title="Месо">
                        {
                            meat.map((item: any) => <FoodItem {...item} key={item.name} />)
                        }
                    </Tab>
                    <Tab eventKey="grains" title="Зърнени">
                        {
                            grain.map((item: any) => <FoodItem {...item} key={item.name} />)
                        }
                    </Tab>
                    <Tab eventKey="dairy" title="Млечни">
                        {
                            dairy.map((item: any) => <FoodItem {...item} key={item.name} />)
                        }
                    </Tab>
                    <Tab eventKey="other" title="Разни">
                        {
                            other.map((item: any) => <FoodItem {...item} key={item.name} />)
                        }
                    </Tab>
                </Tabs>
            </div>
        </Layout>
    );
}

export default FoodList;
