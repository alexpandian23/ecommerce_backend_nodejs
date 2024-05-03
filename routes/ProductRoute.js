const express = require('express')

const router = express.Router();

const ProductController=require('../controller/ProductController')

router.post("/file/addfile",ProductController.addfiles)
router.get("/file/getfile",ProductController.getfiles)
// router.get("/file/findbycategory/mens",ProductController.findbycategory)
router.get("/file/findbycategory/:category",ProductController.findByCategory)
// router.get("/file/findbycategory/kids",ProductController.findbycategory)


module.exports = router