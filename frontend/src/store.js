import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { propertiesReducer,propertyDetailsReducer, newReviewReducer, newPropertyReducer, propertyReducer } from "./reducers/propertyReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { wishListReducer } from "./reducers/wishListReducer";

const reducer = combineReducers({
   properties:propertiesReducer,
   propertyDetails:propertyDetailsReducer, 
   user:userReducer,
   profile:profileReducer,
   forgotPassword:forgotPasswordReducer,
   wishList:wishListReducer,
   newReview:newReviewReducer,
   newProperty:newPropertyReducer,
   property:propertyReducer,
});

let initialState = {
  wishList: {
    wishListItems: localStorage.getItem("wishListItems") 
      ? JSON.parse(localStorage.getItem("wishListItems"))
      : [],
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;