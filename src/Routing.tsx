import React from "react";
import { Switch, Route } from "react-router-dom";
import FoodList from "./ui/food-tracking/food-list/FoodList";
import { Login } from "./ui/user/register/Login";
import { Register } from "./ui/user/register/Register";

export const Routing = () => {
    
    return (
        <Switch>
            <Route exact path="/" component={FoodList} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
        </Switch>
    );
};

