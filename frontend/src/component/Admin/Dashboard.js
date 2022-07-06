import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { properties } = useSelector((state) => state.properties);

  const { users } = useSelector((state) => state.allUsers);


  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


   return (
    
    
       <div className="dashboard">
           <MetaData title={`DashBoard`} />
           <Sidebar />
           <div className="dashboardContainer">
            
            
            <div className="Heading">
                <h1>DashBoard</h1>
            </div>

        <div className="dashboardSummary">
            
        <div className="dashboardSummaryBox2">
            <Link to="/admin/properties">
                <p>Properties</p>
                <p>{properties && properties.length}</p>
            </Link>
           
            <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
            </Link>
        </div>
        </div>
       </div>
    </div>

         
   );
};

export default Dashboard;