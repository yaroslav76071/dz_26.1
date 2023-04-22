const Product = require('./models/products')
const path = require('path')
const createPath = (page) => (path.resolve(__dirname, `${page}.ejs`))
const getScript = (req,res)=>{
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/script.js');
}
const index = async(req,res)=>{
    res.render(createPath('index'))
}
const getProducts = async (req,res)=>{
    const products = await Product.find()
    // res.render(createPath('index'), ({ products, productsSale: [] }))// with reload
    res.json(products) //w/o reload
}
const getProductsSale = async(req,res)=>{
    const productsSale = await Product.find({ onSale: true })
    //res.render(createPath('index'), { productsSale })
    res.json(productsSale)
}
const getDefault = async(req,res)=>{
    const pr = await Product.deleteMany({})
}
const add = async(req,res)=>{
    const { title, price, onSale } = req.body
    const product = new Product({ title, price, onSale })
    try {
        await product.save()
        res.status(201).json(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'failed to add product' })
    }
}
const getDiscount = async (req,res)=>{
    try {
        const products = await Product.aggregate([{ $sample: { size: 10 } }])
        products.forEach(async (product) => {
          let newPrice = (product.price * 0.75).toFixed(2)
          await Product.findByIdAndUpdate(product._id, { $set: { onSale: true, newPrice: newPrice } })
        })
        res.status(200).json({ message: 'products updated' })
      }
      catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to update products' })
      }
}
module.exports = {
    getScript,
    index,
    getProducts,
    getProductsSale,
    getDefault,
    add,
    getDiscount
}