const { Router } = require("express");

const router = Router();

const {
    getAllAuthorsController
} = require("../controllers/author.controller.js");

const {
    onlyQuotesController,
} = require("../controllers/quote.controller.js")

const {
    getOnlyTagsController } = require("../controllers/tag.controller.js")

const { quotesController } = require("../controllers/quoteCenter.controller.js");

//! END POINT SOLICITADO
router.get("/quotes", quotesController)



// 

router.get("/authors", getAllAuthorsController);
router.get("/quotes/only", onlyQuotesController);
router.get("/tags", getOnlyTagsController);




module.exports = router;


