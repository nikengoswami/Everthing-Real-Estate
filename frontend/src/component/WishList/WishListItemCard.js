
import React from "react";
import "./WishListItemCard.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";


const WishListItemCard = ({property}) => {

  const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 20,
    value:property.ratings,
    isHalf:true,
  };
 

  return (
    <Link className="propertyCard" to={`/property/${property.property}`}>
     <img src={property.image} alt={property.propertyType} />
     
     <p>For {property.sellRent}</p>
     <p>{property.propertyType}</p>
     <p>{property.city}</p>
     <div>
       <ReactStars {...options}/> <span > ({property.numOfReviews} Reviews) </span>
     </div>
     <span>{`₹${property.price}`}</span>
   </Link>
   
  );
  
};

export default WishListItemCard;



