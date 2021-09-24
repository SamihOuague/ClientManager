import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./redux/features/menu/Home";
import Login from "./redux/features/auth/Login";
import Product from "./redux/features/menu/Product";
import Basket from "./redux/features/panier/Basket";
import Manage from "./redux/features/menu/Manage";
import AddProduct from "./redux/features/menu/AddProduct";

class MainRouter extends Component {
    render() {
        const routes = [
            {
                path: "/",
                component: Home,
                exact: true,
            },
            {
                path: "/login",
                component: Login,
            },
            {
                path: "/basket",
                component: Basket
            },
            {
                path: "/manage",
                component: Manage
            },
            {
                path: "/product/:cat/:id",
                component: Product,
            },
            {
                path: "/add/:cat",
                component: AddProduct,
            }
        ];
        return (
            <Router>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoute key={i} {...route} />
                    ))}
                </Switch>
            </Router>
        );
    }
}

function RouteWithSubRoute(route) {
    return (
        <Route path={route.path} render={(props) => (
            <route.component {...props} />
        )} />
    );
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(MainRouter);