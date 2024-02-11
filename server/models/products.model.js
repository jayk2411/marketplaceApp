import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: String,
 });
 
 const Products = mongoose.model("Products", productSchema);
 
 export default Products;
