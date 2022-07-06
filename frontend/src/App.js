import './App.css';
import {useState } from "react";
import Header from './component/layout/Header/Header.js';
import { BrowserRouter as Router,Route} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import PropertyDetails from "./component/Property/PropertyDetails.js";
import Properties from "./component/Property/Properties.js";
import Search from "./component/Property/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import {loadUser} from "./actions/userAction";
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import WishList from "./component/WishList/WishList";
import axios from "axios";
import Payment from "./component/WishList/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./component/WishList/Success";
import Dashboard from "./component/Admin/Dashboard.js";
import PropertyList from "./component/Admin/PropertyList";
import NewProperty from "./component/Property/NewProperty";
import Hello from "./component/Property/Hello";

function App() {
  
  const{
    isAuthenticated,
    user} = useSelector(state=>state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

 
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
      });
      store.dispatch(loadUser());

      getStripeApiKey();
    },[]);

  return (
  <Router>
    <Header/>
    {isAuthenticated && <UserOptions user={user}/>}
    
      <Route exact path="/" component={Home}/>
      <Route exact path="/property/:id" component={PropertyDetails}/>
      <Route exact path="/properties" component={Properties}/>
      <Route  path="/properties/:keyword" component={Properties}/>

      <Route exact path="/search" component={Search}/>

      <ProtectedRoute exact path="/account" component={Profile}/>
      <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>
      <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>
      <Route exact path="/password/forgot" component={ForgotPassword}/>
      <Route exact path="/password/reset/:token" component={ResetPassword}/>
      


      <Route exact path="/login"component={LoginSignUp}/>
      <ProtectedRoute exact path="/wishList"component={WishList}/>

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment}/>
      </Elements>
      )}

      <ProtectedRoute exact path="/success" component={Success} />
      
      <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />

        <ProtectedRoute
          exact
          path="/admin/properties"
          isAdmin={true}
          component={PropertyList}
        />

        <ProtectedRoute exact path="/addProperty" component={NewProperty}/>

        <ProtectedRoute exact path="/property/new" component={Hello}/>


    <Footer/>
  </Router>
  );
};

export default App;