const { Router } = require("express");
const { formOne, getFormById, formTwo, getFormTwoById, uploadDocument } = require("../controllers/individualForm.controller");
const { upload } = require("../utils/FileUploaded");

const formRouter = Router();

formRouter.route("/form-one").post(formOne); // Create new form
formRouter.route("/form-one/:id").get(getFormById); // Get form by ID

formRouter.route("/form-two").post(formTwo); // Create new form
formRouter.route("/form-two/:id").get(getFormTwoById); // Get form by ID

formRouter.post(
    "/form-three",
    upload.fields([
        { name: "panCard", maxCount: 1 },
        { name: "aadhaarCard", maxCount: 1 },
        { name: "employeeId", maxCount: 1 }
    ]),
    uploadDocument
);


module.exports = formRouter;