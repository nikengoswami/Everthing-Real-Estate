import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./PropertyDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getPropertyDetails, newReview } from "../../actions/propertyAction";
import { useParams } from 'react-router-dom';
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert"
import MetaData from "../layout/MetaData";
import {addItemsToWishList} from "../../actions/wishListAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/propertyConstants";

const PropertyDetails = ({match,history}) => {
    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

    const {property, loading, error} = useSelector(
        (state)=>state.propertyDetails
    );
    
    const { success, error: reviewError } = useSelector(
      (state) => state.newReview
    );

    const options = {
        size: "large",
        value: property.ratings,
        readOnly:true,
        precision:0.5,
      };
      
      const [open, setOpen] = useState(false);
      const [rating, setRating] = useState(0);
      const [comment, setComment] = useState("");

      const addToWishListHandler = () => {
        dispatch(addItemsToWishList(match.params.id));
        alert.success("Items Added To WishList");
      };

      const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };

      const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("propertyId", match.params.id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };

      const proceedToPayment = () => {
        const data = {
          property
        };
    
        sessionStorage.setItem("propertyInfo", JSON.stringify(data));
    
        history.push("/process/payment");
      };

    useEffect(()=>{
        if(error) {
          alert.error(error);
          dispatch(clearErrors());
        }

        if (reviewError) {
          alert.error(reviewError);
          dispatch(clearErrors());
        }
    
        if (success) {
          alert.success("Review Submitted Successfully");
          dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getPropertyDetails(params.id));
        
    }, [dispatch, params.id, error,alert,reviewError,success]);

    return(
        <Fragment>
          {loading ? (
          <Loader/>
          ) : (
            <Fragment>
            
            <MetaData title={`${property.propertyType} --RealEstate`}/>
            <div className="PropertyDetails">
                <div>
                    <Carousel>
                        {property.images &&
                            property.images.map((item,i) => (
                                <img 
                                className="CarouselImage"
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`} 
                                />
                            ))}
                    </Carousel>
                </div>

                <div>
              <div className="detailsBlock-1">
                
                <p>Property # {property._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  
                  ({property.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${property.price}`}</h1>
                
                <p>For {property.sellRent}</p> 
                <p>Property Type :{property.propertyType}</p>
                <p>Location:{property.location}</p>
                <p>Description:{property.description}</p>

                <div className="detailsBlock-3-1">
                  <button onClick={addToWishListHandler}>Add to Wishlist</button>
                  <button onClick={proceedToPayment}>Buy Property</button>
                </div>
                
              </div>

              <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
  
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>


              {property.reviews && property.reviews[0] ? (
                <div className="reviews">
                  {property.reviews && 
                    property.reviews.map((review) => <ReviewCard review={review}/>)}
                </div>
              ) : (
                <p className="noReviews">No Reviews Yet</p>
              )}
           
        </Fragment>
          )}
        </Fragment>
    );
}
export default PropertyDetails;

