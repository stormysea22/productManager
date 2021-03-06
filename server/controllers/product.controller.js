const Product = require("../models/product.model");

module.exports = {
    index: (req, res) => {
        Product.find()
            .then(data => res.json({ results: data }))
            .catch(err => res.status(404).json({ errors: err.errors }));
    },

    create: (req, res) => {
        Product.create(req.body)
            .then(data => res.json({ results: data }))
            .catch(err => res.status(404).json({ errors: err.errors }));
    },

    show: (req, res) => {
        Product.find({ _id: req.params.id })
            .then(data => res.json({ results: data }))
            .catch(err => res.status(404).json({ errors: err.errors }));
    },

    update: (req, res) => {
        Product.updateOne({ _id:req.params.id},req.body, {runValidators: true})
            .then(data => res.json({ results: data }))
            .catch(err => res.status(404).json({ errors: err.errors }));
    },

    destroy: (req, res) => {
        // Product.deleteOne({ _id: req.params.id })
        //     .then(Product.find()
        //         .then(data => res.json({ results: data }))
        //         .catch(err => res.status(404).json({ errors: err.errors })))
        //     .catch(err => res.status(404).json({ errors: err.errors }));
        Product.deleteOne({ _id: req.params.id }, (err, p) => {
            try {
                Product.find({}, (err, data) => {
                    try {
                        res.json({ results: data })
                    } catch (err) {
                        res.status(404).json({ errors: err.errors })
                    }
                })
            } catch {
                res.status(404).json({ errors: err.errors })
            }
        })
    }
}