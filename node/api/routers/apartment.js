import express from "express";

import { checkAuth } from "../middlewares.js"; 

import { getAll ,create, getApartmentsByAdvertiser, updateApartment, deleteApartment, getApartmentsBycategory, getApartmentsBycity, getApartmentsByBeds, getApartmentsByprice, getApartmentByCode } from "../controllers/apartment.js";

const router = express.Router();

router.post('/',checkAuth, create);
router.get('/',getAll);
router.get('/advertiser/:id', getApartmentsByAdvertiser);
router.get('/:id', getApartmentByCode);
router.get('/getApartmentsBycategory/:id', getApartmentsBycategory);
router.get('/getApartmentsBycity/:id', getApartmentsBycity);
router.get('/beds', getApartmentsByBeds);
router.get('/price', getApartmentsByprice);

router.patch('/:id', checkAuth, updateApartment);


router.delete('/:id',checkAuth, deleteApartment);



export default router;
