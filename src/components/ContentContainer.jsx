import React from 'react';
import AddTodo from './AddTodo';
import Login from './Login'
import Signup from './Signup'
import Navbar from './Navbar';
import Notfound from './Notfound';
import Logout from './Logout';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

const ContentContainer = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/todos" exact component={AddTodo}></Route>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/signup" exact component={Signup}></Route>
                    <Route path="/logout" exact component={Logout}></Route>
                    <Route path="*" component={Notfound}></Route>
                </Switch>
            </Router>
        </>
    )
}

export default ContentContainer;