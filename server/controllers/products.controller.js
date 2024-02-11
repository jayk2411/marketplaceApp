import Products from '../models/products.model.js'
import errorHandler from './error.controller.js'


const addProduct = async (req, res) => {
    const { body } = req;
    const product = new Products(body);
    try {
        await product.save()
        return res.status(200).json({
            message: "Product added Successfully!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const { name } = req.query;
        
        if (name) {
            const products = await Products.find({ name: { $regex: name, $options: 'i' } });
            if(products.length === 0){
                return res.status(404).json("No product found!");
            }else {
                res.json(products);
            }
        } else {
            let products = await Products.find({});
            res.json(products)
        }
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const getProductsById = async (req, res) => {
    try {
        let products = await Products.findById(req.params.id)
        if (!products) {
            return res.status('400').json({
                error: "Product not found"
            })
        } else {
            res.json(products)
        }
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const updateProduct = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Maybe product was not found!`
                });
            } else res.send({ message: "product was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
}

const deleteProduct = async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id)
        res.json({ message: 'product removed successfully' });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const deleteAllProducts = async (req, res) => {
    try {
        await Products.deleteMany({})
        res.json({ message: 'All products removed successfully' });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default { addProduct, getAllProducts, deleteProduct, updateProduct, getProductsById, deleteAllProducts }
