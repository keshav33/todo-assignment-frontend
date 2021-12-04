import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, type, ...rest }) => {
    const checkIfAuthenticated = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            return true;
        } else {
            return false;
        }
    }

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
