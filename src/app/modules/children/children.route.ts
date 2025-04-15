import express, { Router } from "express";
import { ChildrenController } from "./children.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ChildrenValidation } from "./children.validation";


const router = express.Router();

// Children routes
router.post(
  "/",
  validateRequest(ChildrenValidation.createChildren),
  ChildrenController.createChildren
);
router.get("/", ChildrenController.getAllChildrens);
router.get("/:id", ChildrenController.getChildrenById);
router.patch(
  "/:id",
  validateRequest(ChildrenValidation.updateChildren),
  ChildrenController.updateChildren
);


export const ChildrenRoutes: Router = router;
