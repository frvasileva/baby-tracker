import { useQuery } from '@apollo/client';
import { Tab, Tabs } from 'react-bootstrap';
import { FOOD_ITEMS } from '../../../graphql/queries';
import { Layout } from '../../layout/Layout';
import FoodItem from '../food-item/FoodItem';
import './FoodList.scss';

function FoodList() {

    const foodItems = useQuery(FOOD_ITEMS);

    if (foodItems.loading || foodItems.error)
        return <div>Loading</div>

    const items = foodItems.data.foodItems;
    var vegetables = items.filter((item: any) => item.foodGroup === "vegetables");
    var fruits = items.filter((item: any) => item.foodGroup === "fruits");
    var dairy = items.filter((item: any) => item.foodGroup === "dairy");

    return (
        <Layout>
            <div className="food-list-wrapper">

                <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="all" title="Всички">
                        {
                            items.map((item: any) => <FoodItem {...item} key={item.name} />)
                        }
                    </Tab>
                    <Tab eventKey="vegetables" title="Зеленчуци">
                        <p>Зеленчуци:</p>
                        {
                            vegetables.map((item: any) => <FoodItem {...item} key={item.name} />)
                        }
                    </Tab>
                    <Tab eventKey="fruits" title="Плодове">
                        {
                            fruits.map((item: any) => <FoodItem {...item} key={item.name} />)
                        }
                    </Tab>
                    <Tab eventKey="dairy" title="Млечни">
                        {
                            dairy.map((item: any) => <FoodItem {...item} key={item.name} />)
                        }
                    </Tab>
                </Tabs>
            </div>
        </Layout>
    );
}

export default FoodList;
