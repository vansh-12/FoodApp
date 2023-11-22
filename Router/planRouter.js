const express = require('express');
const planRouter = express.Router();
const { protectRoute, isAuthorized } = require('../controller/authController');
const { top3Plan, getPlan, getAllPlans, createPlan, updatePlan, deletePlan } = require('../controller/planController')

//all plans leke aayega
planRouter.route('/allPlans').get(getAllPlans)

//own plan->login necesary
planRouter.use(protectRoute);
planRouter.route('/plan/:id').get(getPlan)

//admin and restaurant owner can only change
planRouter.use(isAuthorized(['admin', 'restaurantowner']));
planRouter.route('/crudPlan').post(createPlan);

planRouter.route('/crudPlan/:id').patch(updatePlan).delete(deletePlan);

planRouter.route('/top3').get(top3Plan)

module.exports = planRouter;
//top3plan