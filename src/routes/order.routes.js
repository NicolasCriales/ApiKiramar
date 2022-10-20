import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";
import {
  getMtPedido,
  getstatus,
  getfacture,
  getfacture_detail,
  getfacture_orderb2b,
  getfacture_detailb2b,
} from "../controllers/index.js";

const router = Router();

router.post("/MPedido",[validateJWT], getMtPedido);
router.post("/MPedido/status",[validateJWT], getstatus);
router.get("/MPedido/facture",[validateJWT], getfacture);
router.get("/MPedido/facture/detail",[validateJWT], getfacture_detail);

router.get("/b2b/facture", [validateJWT], getfacture_orderb2b);
router.get("/b2b/facture/detail", [validateJWT], getfacture_detailb2b);
/*
router.get("/b2c", [validateJWT], getorderb2c);
router.get("/b2c/facture", [validateJWT], getfactureb2c);*/

module.exports = router;
