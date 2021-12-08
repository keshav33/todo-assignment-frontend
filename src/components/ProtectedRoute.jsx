import React from "react";
import { Route, Redirect } from "react-router-dom";
import { checkIfAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ component: Component, type, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => {
                if (checkIfAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;
