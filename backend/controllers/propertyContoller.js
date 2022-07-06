const Property = require("../models/propertyModel");
const errorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middlewear/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const { query } = require("express");
const cloudinary = require("cloudinary");

//create property
exports.createProperty = catchAsyncErrors(async (req,res,next) =>{
  
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "properties",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  
  req.body.user = req.user.id;
    const property = await Property.create(req.body);

    res.status(201).json({
        success:true,
        property
    })
});

//get all properties
exports.getAllProperties = catchAsyncErrors(async (req, res) => { 
    const resultPerPage = 8;
    const apiFeature = new ApiFeatures(Property.find(),req.query).search().filter();

    let properties = await apiFeature.query;
    let filteredPropertiesCount = properties.length;

    apiFeature.pagination(resultPerPage);
    const propertiesCount = await Property.countDocuments();
    properties = await apiFeature.query;
    res.status(200).json({
        success:true,
        properties,
        propertiesCount,
        resultPerPage,
        filteredPropertiesCount,
    });
});

//get all properties (Admin)
exports.getAdminProperties = catchAsyncErrors(async (req, res) => { 
  
  const properties = await Property.find();
  res.status(200).json({
      success:true,
      properties,
  });
});

//update property
exports.updateProperty = catchAsyncErrors(async(req,res,next) =>{
    let property = await Property.findById(req.params.id);

    if(!property) {
        return next(new errorHander("Property not Found",404));
     }

    property = await Property.findByIdAndUpdate(req.params.id,req.body,{ 
        new:true , 
        runValidators:true,
        useFindAndModify:true})
    
    res.status(200).json({
        property
    })
});

//delete property
exports.deleteProperty = catchAsyncErrors(async (req,res,next) =>{
    const property =  await Property.findById(req.params.id);
    
    
    if(!property) {
       return next(new errorHander("Property not Found",404));
    }

    // Deleting Images From Cloudinary
  for (let i = 0; i < property.images.length; i++) {
    await cloudinary.v2.uploader.destroy(property.images[i].public_id);
  }

    await property.remove();
    
    res.status(200).json({
        success:true,
        message : "property sucessfully deleted."
    })
    
});

//get property
exports.getPropertyDetails = catchAsyncErrors(async (req,res,next) =>{
    const property =  await Property.findById(req.params.id);
    
    
    if(!property) {
        return next(new errorHander("Property not Found",404));
     }

    
    
    res.status(200).json({
        success:true,
        property
       
    })
    
});

// Create New Review or Update the review
exports.createPropertyReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, propertyId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const property = await Property.findById(propertyId);
  
    const isReviewed = property.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      property.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      property.reviews.push(review);
      property.numOfReviews = property.reviews.length;
    }
  
    
  let avg = 0;

  property.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  property.ratings = avg / property.reviews.length;
  
    await property.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });

// Get All Reviews of a property
exports.getPropertyReviews = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.findById(req.query.id);

  if (!property) {
    return next(new errorHander("Property not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: property.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.findById(req.query.propertyId);

  if (!property) {
    return next(new errorHander("property not found", 404));
  }

  const reviews = property.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Property.findByIdAndUpdate(
    req.query.propertyId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});