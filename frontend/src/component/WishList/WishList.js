import React, { Fragment } from "react";
import "./WishList.css";
import WishListItemCard from "./WishListItemCard";
import { useSelector, useDispatch } from "react-redux";
import { removeItemsFromWishList } from "../../actions/wishListAction";
import { Typography } from "@material-ui/core";
import HouseIcon from '@mui/icons-material/House';
import { Link } from "react-router-dom";

const WishList = ({ history }) => {
  const dispatch = useDispatch();
  const { wishListItems } = useSelector((state) => state.wishList);


const deleteWishListItems = (id) => {
  dispatch(removeItemsFromWishList(id)); 
};

  return (
    
        <Fragment>
          {wishListItems.length === 0 ? (
            <div className="emptywishList">
            <HouseIcon/>
            <Typography>No Properties in your WishList</Typography>
            <Link to="/properties">View Properties</Link>
          </div>
          ) : (
          <Fragment>
          <div className="wishListPage">
            
            <h2 className="wishListHeading">Wish List</h2>
            
            <div className="wishListCard">
              {wishListItems && 
              wishListItems.map((property)=>(
                <div className="wishListContainer" >
                    <WishListItemCard property={property} deleteWishListItems={deleteWishListItems}/>
                    <button onClick={()=>deleteWishListItems(property.property)}>Remove</button>
                </div>  
              ))}
            </div>
           
          </div>    
        </Fragment>)}
        </Fragment>
     
  );
};

export default WishList;