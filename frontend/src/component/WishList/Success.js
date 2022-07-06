import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./Success.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="Success">
      <CheckCircleIcon />

      <Typography>Property has been Reserved successfully. </Typography>
      <Link to="/properties">View Other Properties</Link>
    </div>
  );
};

export default Success;