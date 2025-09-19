const express = require('express')
const router = express.Router()
const wrapAsync = require('../utils/wrapAsync.js') 
const Listing = require('../models/listing.js')
const { isLoggedIn ,isOwner,validateListing} = require('../middleware.js')



//Index route
router.get(
  '/',
  wrapAsync(async (req, res) => {
    const newListing = await Listing.find({})
    res.render('listings/index.ejs', { newListing })
  })
)

//new routte
router.get('/new', isLoggedIn, (req, res) => {
  res.render('listings/new.ejs')
})

//show route
router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)
      .populate({
        path:'reviews',
      populate:{
        path:"author",
      },
    })
      .populate('owner')
    if (!listing) {
      req.flash('error', 'Listing not found')
      res.redirect('/listings')
    } else {
      res.render('listings/show.ejs', { listing })
    }
  })
)

//Create route
router.post(
  '/',
  validateListing,
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    const newListings = new Listing(req.body.listing)
    newListings.owner = req.user._id
    await newListings.save()
    req.flash('success', 'New Listing Created')
    res.redirect('/listings')
  })
)

//edit route
router.get(
  '/:id/edit',
  isLoggedIn,
   isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)
    if (!listing) {
      req.flash('error', 'Listing not found')
      res.redirect('/listings')
    } else {
      res.render('listings/edit.ejs', { listing })
    }
  })
)

//update route
router.put(
  '/:id',
  validateListing,
  isLoggedIn,
   isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    req.flash('success', 'Listing Updated')
    res.redirect('/listings')
  })
)

//delte route
router.delete(
  '/:id',
  isLoggedIn,
   isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params
    await Listing.findByIdAndDelete(id)
    req.flash('success', 'Listing Deleted')
    res.redirect('/listings')
  })
)

module.exports = router
