const { Router } = require('express');
const { saveFormData, fetchAllFormEntries, saveFormDataTwo, fetchAllFormEntriesTwo, uploadDocuments } = require('../../controllers/forms/FormOne.controllers');



const formRouter = Router();

formRouter.route("/form-one").post(saveFormData)
formRouter.route("/form-one").get(fetchAllFormEntries)

formRouter.route("/form-two").post(saveFormDataTwo)
formRouter.route("/form-two").get(fetchAllFormEntriesTwo)

formRouter.route("/form-three").post(uploadDocuments)




module.exports = formRouter;
