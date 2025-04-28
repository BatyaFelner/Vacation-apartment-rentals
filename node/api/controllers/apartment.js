import Apartment from "../models/apartment.js";
import category from "../models/Category.js";
import City from "../models/City.js";
import jwt from 'jsonwebtoken';  


import advertiser from "../models/advertiser.js";


export const create = async (req, res) => {
    const { name, description, Image, codecategory, codecity, adress, numbeds, adds, price, codeadvertiser } = req.body;

    try {
        const newApartment = new Apartment({
            name,
            description,
            Image,
            codecategory,
            codecity,
            adress,
            numbeds,
            adds,
            price,
            codeadvertiser
        });

        const apartment = await newApartment.save();

        const updatedCity = await City.findByIdAndUpdate(
            codecity, 
            { $push: { apartments: apartment._id } }
        );

        if (!updatedCity) {
            return res.status(404).send({ message: "City not found" });
        }

        const updatedAdvertiser = await advertiser.findByIdAndUpdate(
            codeadvertiser, 
            { $push: { apartments: apartment._id } }
        );

        if (!updatedAdvertiser) {
            return res.status(404).send({ message: "Advertiser not found" });
        }

        const updatedCategory = await category.findByIdAndUpdate(
            codecategory, 
            { $push: { apartments: apartment._id } }
        );

        if (!updatedCategory) {
            return res.status(404).send({ message: "Category not found" });
        }

        res.status(201).send({ message: "Apartment created successfully!", apartment });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};


export const getAll = (req, res) => {
    Apartment.find()
        .populate({
            path: 'codecategory',
            select: 'nameCategory', 
        })
        .populate({
            path: 'codecity',
            select: 'name', 
        })
        .populate({
            path: 'codeadvertiser',
            select: 'email phone Anotherphone', 
        })
        .then(a => {
            res.status(200).send({ a });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};


export const updateApartment = async (req, res) => {
    const { id } = req.params; 
    const { name, description, Image, codecategory, codecity, adress, numbeds, adds, price, codeadvertiser } = req.body;

    try {

        
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            return res.status(401).send({ message: "Unauthorized: No token provided" });
        }

      
        const decoded = jwt.verify(token,"HT2yg75FXgfvy" ); 
        const advertiserId = decoded.id;
      
        const apartment = await Apartment.findById(id);
        if (!apartment) {
            return res.status(404).send({ message: "Apartment not found" });
        }

        if (apartment.codeadvertiser.toString() !== advertiserId) {
            return res.status(403).send({ message: "Forbidden: You can only update your own apartments" });
        }

        if (apartment.codecity.toString() != codecity) {
            
            await City.findByIdAndUpdate(apartment.codecity, { $pull: { apartments: apartment._id } });

           
            await City.findByIdAndUpdate(codecity, { $push: { apartments: apartment._id } });
        }

        
        if (apartment.codecategory.toString() != codecategory) {
            
            await category.findByIdAndUpdate(apartment.codecategory, { $pull: { apartments: apartment._id } });

       
            await category.findByIdAndUpdate(codecategory, { $push: { apartments: apartment._id } });
        }

      
        const updatedApartment = await Apartment.findByIdAndUpdate(
            id,
            {
                name,
                description,
                Image,
                codecategory,
                codecity,
                adress,
                numbeds,
                adds,
                price,
                codeadvertiser,
            },
            { new: true } 
        );

        res.status(200).send({updatedApartment });

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};




export const deleteApartment = async (req, res) => {
    const { id } = req.params;

    try {
        const apartment = await Apartment.findById(id);
        if (!apartment) {
            return res.status(404).send({ message: "Apartment not found" });
        }

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, 'HT2yg75FXgfvy'); 
        const advertiserId = decoded.id;

        if (apartment.codeadvertiser.toString() !== advertiserId) {
            return res.status(403).send({ message: "Forbidden: You can only delete your own apartments" });
        }

        await Apartment.findByIdAndDelete(id);

        await City.findByIdAndUpdate(apartment.codecity, { $pull: { apartments: apartment._id } });
        await category.findByIdAndUpdate(apartment.codecategory, { $pull: { apartments: apartment._id } });
        await advertiser.findByIdAndUpdate(apartment.codeadvertiser, { $pull: { apartments: apartment._id } });
        res.status(200).send({ message: "Apartment deleted successfully" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const getApartmentsByAdvertiser = (req, res) => {
    const { id } = req.params; 
    Apartment.find({ codeadvertiser: id }) 
    .populate({
        path: 'codecategory',
        select: 'nameCategory', 
    })
    .populate({
        path: 'codecity',
        select: 'name', 
    })
    .populate({
        path: 'codeadvertiser',
        select: 'email phone Anotherphone', 
    })

        .then(apartments => res.status(200).send(apartments))
        .catch(err => res.status(500).send({ error: err.message }));
};

export const getApartmentsBycategory = (req, res) => {
    const { id } = req.params; 
    Apartment.find({ codecategory: id }) 
    .populate({
        path: 'codecategory',
        select: 'nameCategory', 
    })
    .populate({
        path: 'codecity',
        select: 'name', 
    })
    .populate({
        path: 'codeadvertiser',
        select: 'email phone Anotherphone', 
    })

        .then(c => res.status(200).send(c))
        .catch(err => res.status(500).send({ error: err.message }));
};


export const getApartmentsBycity = (req, res) => {
    const { id } = req.params; 
    Apartment.find({ codecity: id }) 
    .populate({
        path: 'codecategory',
        select: 'nameCategory', 
    })
    .populate({
        path: 'codecity',
        select: 'name', 
    })
    .populate({
        path: 'codeadvertiser',
        select: 'email phone Anotherphone', 
    })

        .then(c => res.status(200).send(c))
        .catch(err => res.status(500).send({ error: err.message }));
};

export const getApartmentByCode = (req, res) => {
    const { id } = req.params;  
   console.log(id)
   Apartment.findOne({ _id: id })
        .populate({
            path: 'codecategory',
            select: 'nameCategory', 
        })
        .populate({
            path: 'codecity',
            select: 'name', 
        })
        .populate({
            path: 'codeadvertiser',
            select: 'email phone Anotherphone', 
        })
        .then(apartment => {
            if (!apartment) {
                return res.status(404).send({ message: "Apartment not found!!!!" });
            }
            res.status(200).send(apartment);  
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};

export const getApartmentsByBeds = (req, res) => {
    const { min,max , equal} = req.query; 
    const filter = {};
    if (min) {
        filter.numbeds = { $gte: parseInt(min) };
    }
    if (max) {
        filter.numbeds = { ...filter.numbeds, $lte: parseInt(max) }; 
    }
    if(equal){
        filter.numbeds={ $eq: parseInt(equal)}
    }
  Apartment.find(filter)
  .populate({
    path: 'codecategory',
    select: 'nameCategory', 
})
.populate({
    path: 'codecity',
    select: 'name', 
})
.populate({
    path: 'codeadvertiser',
    select: 'email phone Anotherphone', 
})
        .then(apartments => {
            if (apartments.length == 0) {
                return res.status(404).send({ message: "No apartments found matching the criteria" });
            }
            res.status(200).send({ apartments });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};


export const getApartmentsByprice = (req, res) => {
    const { min,max , equal} = req.query; 
    const filter = {};
    if (min) {
        filter.price = { $gte: parseInt(min) };
    }
    if (max) {
        filter.price = { ...filter.numbeds, $lte: parseInt(max) }; 
    }
    if(equal){
        filter.price={ $eq: parseInt(equal)}
    }
  Apartment.find(filter)
  .populate({
    path: 'codecategory',
    select: 'nameCategory', 
})
.populate({
    path: 'codecity',
    select: 'name', 
})
.populate({
    path: 'codeadvertiser',
    select: 'email phone Anotherphone', 
})
        .then(apartments => {
            if (apartments.length == 0) {
                return res.status(404).send({ message: "No apartments found matching the criteria" });
            }
            res.status(200).send({ apartments });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};

