import React, { Fragment , useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Property from "./PropertyCard.js";
import MetaData from "../layout/MetaData";
import {clearErrors, getProperty} from "../../actions/propertyAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  
  const { loading, error, properties} = useSelector((state) => state.properties);

  useEffect(() => {
    if(error) {
       alert.error(error);
       dispatch(clearErrors());
    }
    dispatch(getProperty());
  }, [dispatch,error,alert]);
  
  return (
    <Fragment>
      {loading ? (<Loader/>):(
        <Fragment>
        <MetaData title="Real Estate"/>
        <div className="banner">
          <p>Welcome to Real Estate</p> 
          <h1>FIND AMAZING PROPERTIES BELOW</h1>

             <a href="#container">
               <button>
                 Scroll <CgMouse />
               </button>
             </a>
        </div>
        <h2 className="homeHeading">Featured properties</h2>
        <div className="container" id="container">
            {properties && properties.map((property) => <Property property={property}/> )}
        </div>
    </Fragment>
      )}
    </Fragment>
  ); 
  
  
  
};

export default Home;