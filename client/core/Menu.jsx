
// eslint-disable-next-line no-unused-vars
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import { Link, withRouter } from 'react-router-dom'
import logo from '../assets/images/capture2.jpg';
import SearchBar from './search';


const myApp = {
  backgroundColor: "#15241D",
  position: 'relative',


};
const myLogo = {
  position: 'relative',
  width: '240px',
  height: 'auto',
};

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return { color: '#bef67a' }
  else
    return { color: '#ffffff' }
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return { color: '#bef67a' }
  else
    return { color: '#ffffff' }
}



const Menu = withRouter(({ history }) => (

  <AppBar style={myApp} >

    <Toolbar >
      <Link to="/">
        <img src={logo} style={myLogo} />
      </Link>

      <div>
        <Link to="/product">
          <Button style={isActive(history, "/product")}> Products
          </Button>

        </Link>
      </div>

      <div>
        <SearchBar />
      </div>

      <div style={{ 'position': 'absolute', 'right': '10px' }}><span style={{ 'float': 'right' }}>
        {
          !auth.isAuthenticated() && (<span>
            <Link to="/signup">
              <Button style={isActive(history, "/signup")}>Sign up
              </Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(history, "/signin")}>Sign In
              </Button>
            </Link>
          </span>)
        }
        {
          auth.isAuthenticated() && (<span>
            {auth.isAuthenticated().user.seller && (<Link to="/seller/shops"><Button style={isPartActive(history, "/seller/")}>My Shops</Button></Link>)}
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
            </Link>
            <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
          </span>)
        }
      </span></div>
    </Toolbar>
  </AppBar>
))

export default Menu
