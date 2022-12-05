import { Router } from 'express';
import { validateJWT } from '../middlewares/validate-jwt';
import {
	getMtPedido,
	getstatus,
	getpayment,
	getPedido,
	getPedidoWEb,
	getPedido_detail,
	getfacture_orderb2b,
	getfacture_detailb2b,
	getfacture_status,
	getPedido_response,
} from '../controllers/index.js';

const router = Router();

router.post('/MPedido', [validateJWT], getMtPedido);
router.post('/MPedido/status', [validateJWT], getstatus);
router.get('/MPedido/payment', [validateJWT], getpayment);
router.get('/MPedido/pedido', [validateJWT], getPedido);
router.get('/MPedido/PedidoWEb', [validateJWT], getPedidoWEb);
router.get('/MPedido/pedido/detail', [validateJWT], getPedido_detail);

router.post('/MPedido/payment/response', getPedido_response);



router.get('/b2b/facture', [validateJWT], getfacture_orderb2b);
router.get('/b2b/facture/detail', [validateJWT], getfacture_detailb2b);
router.post('/b2b/facture/status', getfacture_status);


/*
router.get("/b2c", [validateJWT], getorderb2c);
router.get("/b2c/facture", [validateJWT], getfactureb2c);*/

module.exports = router;
