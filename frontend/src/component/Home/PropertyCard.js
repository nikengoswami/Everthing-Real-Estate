
import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";



const PropertyCard = ({property}) => {
  const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 20,
    value:property.ratings,
    isHalf:true,
  };

  return (
    <Link className="propertyCard" to={`/property/${property._id}`}>
    <img src={property.images[0].url} alt={property.propertyType} />
    <p>For {property.sellRent}</p>
    <p>{property.propertyType}</p>
    <p>{property.city}</p>
    <div>
      <ReactStars {...options}/> <span > ({property.numOfReviews} Reviews) </span>
    </div>
    <span>{`₹${property.price}`}</span>
  </Link>
    
  );
}
export default PropertyCard;