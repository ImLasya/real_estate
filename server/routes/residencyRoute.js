// import express from "express";
// import { createResidency, getAllResidencies, getResidency } from "../controllers/residencyController.js";
// import jwtCheck from "../config/auth0Config.js";

// const router=express.Router()

// router.post('/create',jwtCheck,createResidency)
// router.get("/allresd",getAllResidencies)
// router.get("/:id",getResidency)


// export {router as residencyRoute}

import express from 'express';
import { allResidencies, createResidency, getResidency } from '../controllers/residencyController.js';
import jwtCheck from '../config/auth0Config.js';

const route =new express.Router();

route.post('/create',jwtCheck,createResidency);
route.get('/all',allResidencies);
route.get('/:id',getResidency)
export {route as residencyRoute};