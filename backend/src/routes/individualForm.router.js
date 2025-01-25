const { Router } = require("express");
const { formOne } = require("../controllers/individualForm.controller");

const formRouter = Router();

formRouter.post("/form-one", formOne); // POST /api/form-one

module.exports = formRouter;
