import {ALL_PROPERTY_REQUEST,
        ALL_PROPERTY_SUCCESS,
        ALL_PROPERTY_FAIL,
        PROPERTY_DETAILS_REQUEST,
        PROPERTY_DETAILS_SUCCESS,
        PROPERTY_DETAILS_FAIL,
        NEW_PROPERTY_REQUEST,
        NEW_PROPERTY_SUCCESS,
        NEW_PROPERTY_RESET,
        NEW_PROPERTY_FAIL,
        UPDATE_PROPERTY_REQUEST,
        UPDATE_PROPERTY_SUCCESS,
        UPDATE_PROPERTY_FAIL,
        UPDATE_PROPERTY_RESET,
        DELETE_PROPERTY_REQUEST,
        DELETE_PROPERTY_SUCCESS,
        DELETE_PROPERTY_RESET,
        DELETE_PROPERTY_FAIL,
        ADMIN_PROPERTY_SUCCESS,
        ADMIN_PROPERTY_REQUEST,
        ADMIN_PROPERTY_FAIL,
        NEW_REVIEW_REQUEST,
        NEW_REVIEW_SUCCESS,
        NEW_REVIEW_RESET,
        NEW_REVIEW_FAIL,
        CLEAR_ERRORS} from "../constants/propertyConstants";

export const propertiesReducer = (state = { properties: [] }, action) => {

    switch (action.type) {
        case ALL_PROPERTY_REQUEST:
        case ADMIN_PROPERTY_REQUEST:
           return {
               loading:true,
               properties:[]
           }
        case ALL_PROPERTY_SUCCESS:
            return {
                loading:false,
                properties:action.payload.properties,
                propertiesCount:action.payload.propertiesCount,
                resultPerPage : action.payload.resultPerPage,
                filteredPropertiesCount: action.payload.filteredPropertiesCount,
            }
        case ADMIN_PROPERTY_SUCCESS:
            return {
              loading:false,
              properties:action.payload,
            }
        
        case ALL_PROPERTY_FAIL:
        case ADMIN_PROPERTY_FAIL:
            return {
                loading:false,
                error:action.payload
            }   
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            } 
        default:
            return state; 
    }
};

export const propertyReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROPERTY_REQUEST:
    case UPDATE_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PROPERTY_FAIL:
    case UPDATE_PROPERTY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PROPERTY_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PROPERTY_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


export const propertyDetailsReducer = (state = { property: {} }, action) => {

    switch (action.type) {
        case PROPERTY_DETAILS_REQUEST:
           return {
               loading:true,
               ...state
           }
        case PROPERTY_DETAILS_SUCCESS:
            return {
                loading:false,
                property:action.payload,
                
            } 
        case PROPERTY_DETAILS_FAIL:
            return {
                loading:false,
                error:action.payload
            }   
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            } 
        default:
            return state; 
    }
};

export const newPropertyReducer = (state = { property: {} }, action) => {
  switch (action.type) {
    case NEW_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PROPERTY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        property:action.payload.property,
      };
    case NEW_PROPERTY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PROPERTY_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };