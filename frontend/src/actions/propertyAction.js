import axios from "axios";
import {ALL_PROPERTY_REQUEST,
        ALL_PROPERTY_SUCCESS,
        ALL_PROPERTY_FAIL,
        ADMIN_PROPERTY_SUCCESS,
        ADMIN_PROPERTY_REQUEST,
        ADMIN_PROPERTY_FAIL,
        NEW_PROPERTY_REQUEST,
        NEW_PROPERTY_SUCCESS,
        NEW_PROPERTY_RESET,
        UPDATE_PROPERTY_REQUEST,
        UPDATE_PROPERTY_SUCCESS,
        UPDATE_PROPERTY_FAIL,
        UPDATE_PROPERTY_RESET,
        NEW_PROPERTY_FAIL,
        DELETE_PROPERTY_REQUEST,
        DELETE_PROPERTY_SUCCESS,
        DELETE_PROPERTY_FAIL,
        PROPERTY_DETAILS_REQUEST,
        PROPERTY_DETAILS_SUCCESS,
        PROPERTY_DETAILS_FAIL,
        NEW_REVIEW_REQUEST,
        NEW_REVIEW_SUCCESS,
        NEW_REVIEW_FAIL,
     CLEAR_ERRORS} from "../constants/propertyConstants";

//Get all properties     
export const getProperty = (keyword="",currentPage=1,price = [500000,25000000],propertyType,ratings=0) => async (dispatch) => {

        try {
            dispatch({type : ALL_PROPERTY_REQUEST});

            let link = `/api/v1/properties?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
            
            if(propertyType) {
                link = `/api/v1/properties?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&propertyType=${propertyType}&ratings[gte]=${ratings}`; 
            }

            const {data} = await axios.get(link);

            dispatch({
                type:ALL_PROPERTY_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type:ALL_PROPERTY_FAIL,
                payload: error.response.data.message,
            });
        }
};

//Get all properties for Admin
export const getAdminProperty = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PROPERTY_REQUEST });
  
      const { data } = await axios.get("/api/v1/admin/properties");
  
      dispatch({
        type: ADMIN_PROPERTY_SUCCESS,
        payload: data.properties,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PROPERTY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//PropertyDetails
export const getPropertyDetails = (id) => async (dispatch) => {

    try {
        dispatch({type : PROPERTY_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/property/${id}`);

        dispatch({
            type:PROPERTY_DETAILS_SUCCESS,
            payload: data.property,
        })
    } catch (error) {
        dispatch({
            type:PROPERTY_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Create Property 
export const createProperty = (propertyData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PROPERTY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v1/addProperty`, propertyData, config);

    dispatch({
      type: NEW_PROPERTY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PROPERTY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Property
export const updateProperty = (id, propertyData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROPERTY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/properties/${id}`,
      propertyData,
      config
    );

    dispatch({
      type: UPDATE_PROPERTY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROPERTY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete Property
export const deleteProperty = (id) => async (dispatch) => {

  try {
      dispatch({type : DELETE_PROPERTY_REQUEST});

      const {data} = await axios.delete(`/api/v1/property/${id}`);

      dispatch({
          type:DELETE_PROPERTY_SUCCESS,
          payload: data.success,
      })
  } catch (error) {
      dispatch({
          type:DELETE_PROPERTY_FAIL,
          payload: error.response.data.message,
      });
  }
};


//New Review 
export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//clearing errors
export const clearErrors = () => async (dispatch) => { 
    dispatch({
        type:CLEAR_ERRORS
    })
};