const { Router } = require("express");
const dashboradController = require("./DashboardController");
const asyncHandeler = require("express-async-handler")

const dashboardRouter = Router()

dashboardRouter.get("/:userId",asyncHandeler(dashboradController.fetchDashboard) )

module.exports = dashboardRouter