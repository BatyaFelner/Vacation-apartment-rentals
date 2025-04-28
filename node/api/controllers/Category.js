import category from "../models/Category.js";


export const create = (req, res) => {
    const { nameCategory } = req.body;

    if (!nameCategory) {
        return res.status(400).send({ message: "Category name is required." });
    }

    const newCategory = new category({ nameCategory });

    newCategory.save()
    .then(category => {
        res.status(201).send({ message: "Category created successfully!", category });
    })
    .catch(err => {
    
            res.status(500).send({ error: err.message });
        }
    );
    }


export const getAll = (req, res) => {
    category.find()
        .then(categories => {
            res.status(200).send({ categories });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};
