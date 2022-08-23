import{Router} from 'express';

import * as produtoControllers from '../controller/produtoController';

const router = Router();
router.get('/', produtoControllers.home)

router.get('/cadastro',produtoControllers.createProduct);//page
router.post('/cadastro1',produtoControllers.createProduct1);

router.get('/estoqueTotal', produtoControllers.stockList);//page
router.get('/estoque1', produtoControllers.stockList1);

router.get('/estoqueListItem', produtoControllers.stockItem)////page
router.get('/estoque/:material', produtoControllers.stockItem1)

router.get('/estoqueUpdate', produtoControllers.stockUpdate)//page
router.post('/estoqueUpdate1', produtoControllers.stockUpdate1)

router.get('/estoqueDelete',produtoControllers.removeItem)//page
router.get('/Delete/:estoque',produtoControllers.removeItem1)

export default router;