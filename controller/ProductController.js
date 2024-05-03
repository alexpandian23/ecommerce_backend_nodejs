const Products = require('../models/ProductsModel')
const apiResponse = require('../helpers/apiResponse')

//add songs
exports.addfiles = ((req, res) => {
    const productDetails = req.body;
    const products = new Products(productDetails)

    products.save()
        .then((savedProducts) => {
            // return res.status(200).send(savedSongs);
            // return apiResponse.responseWithData(res,savedSongs,"insert success")
            return apiResponse.responseWithoutData(res,savedProducts,"insert success")

        }).catch((err) => {
            return res.status(500).send(err.message);
        })
})

//list songs
exports.getfiles = [(req, res) => {
    Products.find()
        .then((products) => {
            return res.status(200).send(products)
        }).catch((err) => {
            return res.status(200).send(err.message)
        })
}]


//find by artist name

exports.findByCategory = (req, res) => {
    const category = req.params.category;
    console.log("Category:", category);
 

    Products.find({ category: category })
        .then((products) => {
            console.log("Selected products:", products);
            if (products.length === 0) {
                return res.status(404).json({ message: "No products found for the provided category." });
            }
            return res.status(200).json(products);
        })
        .catch((err) => {
            console.error("Error:", err);
            return res.status(500).json({ error: err.message });
        });
};

