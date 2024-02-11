import express from 'express'
 import productCtrl from '../controllers/products.controller.js' 
 const router = express.Router()
 router.route('/api/products').get(productCtrl.getAllProducts);
 router.route('/api/products?name=[kw]').get(productCtrl.getAllProducts);
 router.route('/api/products/:id').get(productCtrl.getProductsById);
 router.route('/api/products').post(productCtrl.addProduct);
 router.route('/api/products/:id').put(productCtrl.updateProduct);
 router.route('/api/products/:id').delete(productCtrl.deleteProduct);
 router.route('/api/products').delete(productCtrl.deleteAllProducts);
 

 export default router ;
