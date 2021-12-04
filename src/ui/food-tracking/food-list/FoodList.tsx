import { useQuery } from '@apollo/client';
import { FOOD_ITEMS, FOOD_ITEMS_PER_CHILD } from '../../../graphql/queries';
import { Layout } from '../../layout/Layout';
import './FoodList.scss';
import { useRealmApp } from '../../../RealmApp';
import { useEffect, useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FoodListItem from './FoodListItem';
import LoadingScreen from '../../layout/LoadingScreen';
import { FoodItemTracker } from '../../../types/types';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function FoodList() {
    const app = useRealmApp();

    const foodItems = useQuery(FOOD_ITEMS);
    const foodItemsPerChild = useQuery(FOOD_ITEMS_PER_CHILD, {
        variables: {
            childId: app.currentUser.customData.children[0].$oid
        }
    });

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [foodItemsState, setFoodItemsState] = useState([]);

    useEffect(() => {
        setFoodItemsState(foodItemsPerChild?.data?.childFoodItems);
    }, [foodItemsPerChild]);


    if (foodItems.loading || foodItems.error || foodItemsPerChild.loading || foodItemsPerChild.error)
        return <LoadingScreen />

    const fItemsPerChild = foodItemsPerChild.data.childFoodItems;
    const items = foodItems.data.foodItems.map((item: FoodItemTracker) => (
        {
            ...item,
            isSelected: fItemsPerChild.some((itm: any) => itm.food._id === item._id),
            introductionDate: fItemsPerChild.find((itm: any) => itm.food._id === item._id)?.introductionDate
        }))

    console.log("items", items);
    var vegetables = items.filter((item: any) => item.foodGroup === "vegetables");
    var fruits = items.filter((item: any) => item.foodGroup === "fruits");
    var dairy = items.filter((item: any) => item.foodGroup === "dairy");
    var grain = items.filter((item: any) => item.foodGroup === "grain");
    var meat = items.filter((item: any) => item.foodGroup === "meat");
    var other = items.filter((item: any) => item.foodGroup === "other");

    const foodGroups = ["vegetables", "fruits", "dairy", "grain", "meat", "other"];
    
    function filterItems(filter: string) {
        return items.filter((item: any) => item.foodGroup === filter);
    }

    return (
        <Layout>
            <div className="food-list-wrapper">
                <Box sx={{ width: '100%', backgroundColor: "#eceff1" }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Зеленчуци" {...a11yProps(0)} />
                            <Tab label="Плодове" {...a11yProps(1)} />
                            <Tab label="Месо" {...a11yProps(2)} />
                            <Tab label="Зърнени" {...a11yProps(3)} />
                            <Tab label="Млечни" {...a11yProps(4)} />
                            <Tab label="Разни" {...a11yProps(5)} />
                        </Tabs>
                    </Box>

                    <TabPanel value={value} index={0}>
                        <FoodListItem items={vegetables} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <FoodListItem items={fruits} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <FoodListItem items={meat} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <FoodListItem items={grain} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <FoodListItem items={dairy} />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <FoodListItem items={other} />
                    </TabPanel>
                </Box>
            </div>
        </Layout>
    );
}

export default FoodList;
