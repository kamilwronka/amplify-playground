import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import AuthPage from "../features/AuthPage";
import MainPage from "../features/MainPage";
import useAuth from "../hooks/useAuth";

export default function Navigation() {
    const { authorized } = useAuth();

    console.log(authorized);

    return (
        <Router>
            <Switch>
                <Route path="/auth">
                    {authorized ? <Redirect to="/" /> : <AuthPage />}
                </Route>
                <Route path="/">
                    <MainPage />
                </Route>
            </Switch>
        </Router>
    );
}
