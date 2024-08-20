import { Router } from "express";
import { addToCart , deleteFromCart , viewCart , deleteAllCartItems } from "../controllers/userController.js";


const router = Router();

router.route("/cart").get(viewCart);
router.route("/cart").post(addToCart);
router.route("/cart").delete(deleteAllCartItems);
router.route("/cart/:id").delete(deleteFromCart);

export default router;

