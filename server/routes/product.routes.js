import express from "express";
import productCtrl from "../controllers/product.controller.js";

const router = express.Router();


router.route("/api/product")
    .get(productCtrl.searchProdName)
    // .get(productCtrl.getProducts)
    .post(productCtrl.createProduct)


    router
    .route("/api/product/:prodID")
        // .get(productCtrl.getProduct)
        .get(productCtrl.read)
    .put(productCtrl.updateProduct)
    .delete(productCtrl.deleteProduct);

// router.param("prodID", productCtrl.getProduct) //for new productIDsearch
router.param("prodID", productCtrl.ProductByID)

export default router;
