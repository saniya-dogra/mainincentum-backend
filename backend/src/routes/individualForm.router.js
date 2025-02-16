// individualForm.router.js

const { Router } = require("express");
const {  formOne, getFormById, formTwo, getFormTwoById } = require("../controllers/individualForm.controller");

const formRouter = Router();

formRouter.route("/form-one").post(formOne); // Create new form
formRouter.route("/form-one/:id").get(getFormById); // Get form by ID

formRouter.route("/form-two").post(formTwo); // Create new form
formRouter.route("/form-two/:id").get(getFormTwoById); // Get form by ID

module.exports = formRouter;
