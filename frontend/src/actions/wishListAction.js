import {
    ADD_TO_WISHLIST,
    REMOVE_WISHLIST_ITEM,
  } from "../constants/wishListConstants";
  import axios from "axios";
  
  // Add to WishList
  export const addItemsToWishList = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/property/${id}`);
  
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: {
        property: data.property._id,
        sellRent: data.property.sellRent,
        propertyType: data.property.propertyType,
        price: data.property.price,
        location: data.property.location, 
        image: data.property.images[0].url,
        city: data.property.city
      },
    });
  
    localStorage.setItem("wishListItems", JSON.stringify(getState().wishList.wishListItems));
  };
  
  // REMOVE FROM WISHLIST
  export const removeItemsFromWishList = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_WISHLIST_ITEM,
      payload: id,
    });
  
    localStorage.setItem("wishListItems", JSON.stringify(getState().wishList.wishListItems));
  };
  
