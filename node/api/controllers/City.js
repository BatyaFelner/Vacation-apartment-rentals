import City from "../models/City.js"

export const create = (req, res) => {
    const { name } = req.body;

    const newCity = new City({ 
        name
    });

    newCity.save()
        .then(c => {
            res.status(200).send({ message: `create city ${newCity.name} succeed!` });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}


export const getAll = (req, res) => {
   
  City.find()

        .then(data => {
            res.status(200).send({ City: data })
        })
   
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}


