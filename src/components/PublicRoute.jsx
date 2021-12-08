import React from "react";
import { Route, Redirect } from "react-router-dom";
import { checkIfAuthenticated } from "../utils/auth";

const PublicRoute = ({ component: Component, type, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => {
                if (checkIfAuthenticated()) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
};

export default PublicRoute;
