const express = require("express");
const {getAllProperties,createProperty, updateProperty, deleteProperty,  createPropertyReview, getPropertyReviews, deleteReview, getPropertyDetails, getAdminProperties} = require("../controllers/propertyContoller");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewear/auth");

const router = express.Router();

router.route("/properties").get(getAllProperties);

router.route("/admin/properties").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProperties);

router.route("/addProperty").post(isAuthenticatedUser,createProperty);

router.route("/admin/property/:id").put(isAuthenticatedUser,updateProperty).delete(isAuthenticatedUser,deleteProperty);

router.route("/property/:id").get(getPropertyDetails);

router.route("/review").put(isAuthenticatedUser,createPropertyReview);

router.route("/reviews").get(getPropertyReviews).delete(isAuthenticatedUser,deleteReview);

module.exports= router;
