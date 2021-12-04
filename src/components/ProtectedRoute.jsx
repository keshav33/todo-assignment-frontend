import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, type, ...rest }) => {
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
