import React from 'react';
import AddTodo from './AddTodo';
import Login from './Login'
import Signup from './Signup'
import Navbar from './Navbar';
import Notfound from './Notfound';
import Logout from './Logout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const ContentContainer = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <ProtectedRoute path="/" exact component={AddTodo} />
                    <PublicRoute path="/login" exact component={Login} />
                    <PublicRoute path="/signup" exact component={Signup} />
                    <PublicRoute path="/logout" exact component={Logout} />
                    <Route path="*" component={Notfound} />
                </Switch>
            </Router>
        </>
    )
}

export default ContentContainer;