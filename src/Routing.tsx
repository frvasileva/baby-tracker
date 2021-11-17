import { Switch, Route } from "react-router-dom";
import FoodInfoDetails from "./ui/food-info/food-info-details/FoodInfoDetails";
import FoodInfoList from "./ui/food-info/food-info-lIst/FoodInfoLIst";
import FoodList from "./ui/food-tracking/food-list/FoodList";
import { ChildProfile } from "./ui/user/profile/ChildProfile";
import { UserProfile } from "./ui/user/profile/UserProfile";
import { Login } from "./ui/user/register/Login";
import { Register } from "./ui/user/register/Register";
import { RegisterBaby } from "./ui/user/register/RegisterBaby";

export const Routing = () => {

    return (
        <Switch>
            <Route exact path="/" component={FoodInfoList} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create-baby-profile" component={RegisterBaby} />
            <Route exact path="/user/profile" component={UserProfile} />
            <Route exact path="/child/profile/:id" component={ChildProfile} />
            <Route exact path="/food-list" component={FoodList} />
            <Route exact path="/foods" component={FoodInfoList} />
            <Route exact path="/foods/:friendlyUrl" component={FoodInfoDetails} />
        </Switch>
    );
};

