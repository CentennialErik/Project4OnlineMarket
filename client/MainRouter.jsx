import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import Products from './product/Product'
import SearchResults from './core/searchresults';     

const MainRouter = () => {
  return (<div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/product" component={Products} />
      <Route path="/search" component={SearchResults} />    
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
      <Route path="/user/:userId" component={Profile} />
    </Switch>
  </div>)
}

export default MainRouter
