const express = require('express')
const {
  getScript,
  index,
  getProducts,
  getProductsSale,
  getDefault,
  add,
  getDiscount
} = require('../controller')
const router = express.Router()
router.get('/script.js', getScript)
router.get('/', index)
router.get('/products', getProducts)
router.get('/products-action', getProductsSale)
router.post('/add-product', add)
router.patch('/upd-products', getDiscount)
router.get('/makeDefault', getDefault)
module.exports = router