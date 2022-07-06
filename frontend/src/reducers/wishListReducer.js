import {
    ADD_TO_WISHLIST,
    REMOVE_WISHLIST_ITEM,
  } from "../constants/wishListConstants";
  
  export const wishListReducer = (
    state = { wishListItems: [] },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_WISHLIST:
        const item = action.payload;
  
        const isItemExist = state.wishListItems.find(
          (i) => i.property === item.property
        );
  
        if (isItemExist) {
          return {
            ...state,
            wishListItems: state.wishListItems.map((i) =>
              i.property === isItemExist.property ? item : i
            ),
          };
        } else {
          return {
            ...state,
            wishListItems: [...state.wishListItems, item],
          };
        }
  
      case REMOVE_WISHLIST_ITEM:
        return {
          ...state,
          wishListItems: state.wishListItems.filter((i) => i.property !== action.payload),
        };
  
      default:
        return state;
    }
  };