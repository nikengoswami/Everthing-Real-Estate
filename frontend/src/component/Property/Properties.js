import React, { Fragment, useEffect, useState } from "react";
import "./Properties.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors} from "../../actions/propertyAction";
import Loader from "../layout/Loader/Loader";
import PropertyCard from "../Home/PropertyCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import { getProperty } from "../../actions/propertyAction";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { useParams } from 'react-router-dom';

const propertyTypes = [
  "Apartement",
  "House",
  "Villa",
  "Shop",
  "Plot",
];

const Properties = () => {
  const dispatch = useDispatch();
  const params = useParams();


  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([500000, 25000000]);
  const [propertyType, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    properties,
    loading,
    error,
    propertiesCount,
    resultPerPage,
    filteredPropertiesCount,
  } = useSelector((state) => state.properties);

  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredPropertiesCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProperty(keyword,currentPage,price,propertyType,ratings,alert,error));
  }, [dispatch,keyword,currentPage,price,propertyType,ratings,alert,error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          
          <MetaData title="Properties --RealEstate"/>
          <h2 className="propertiesHeading">Properties</h2>

          <div className="properties">
            {properties &&
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={500000}
              max={25000000}
            />

            <Typography>Property Types</Typography>
            <ul className="categoryBox">
              {propertyTypes.map((propertyType) => (
                <li
                  className="category-link"
                  key={propertyType}
                  onClick={() => setCategory(propertyType)}
                >
                  {propertyType}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>

          </div>

          {resultPerPage < count && (
            
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={propertiesCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

        </Fragment>
      )}

    </Fragment>
  );
};

export default Properties;