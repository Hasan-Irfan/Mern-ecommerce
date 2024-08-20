import { Router } from "express";
import { addProduct ,updatePutProduct ,updatePatchProduct ,viewAllProducts, deleteProduct} from "../controllers/productController.js"; 

const router = Router();

router.route("/products").post(addProduct);
router.route("/products").get(viewAllProducts);

// router.route("/products/:id").get(viewProduct);

// router.route("/products/:id").put(updatePutProduct);

router.route("/products/:id").patch(updatePatchProduct);
router.route("/products/:id").delete(deleteProduct);

export default router;
