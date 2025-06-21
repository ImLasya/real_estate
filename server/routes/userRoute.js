// import express from "express";
// import { allFav, bookVisit, cancelBooking, createUser, getAllBookings, toFav } from "../controllers/userController.js";
// import jwtCheck from "../config/auth0Config.js";

// const router=express.Router()

// router.post('/register',jwtCheck ,createUser)
// router.post('/bookVisit/:id',jwtCheck,bookVisit)
// router.post('/allBookings',getAllBookings)
// router.post('/removeBooking/:id',jwtCheck,cancelBooking)
// router.post('/toFav/:rid',jwtCheck,toFav)
// router.post('/allFav/',jwtCheck,allFav)




// export {router as userRoute}

import express from 'express';
import { Prisma } from '@prisma/client';
import { allBookings, allfavourites, bookedVisit,cancelBooking,createUser, toFav } from '../controllers/userController.js';
import jwtCheck from '../config/auth0Config.js';

const route =new express.Router();

route.post('/register',jwtCheck,createUser);
route.post('/bookVisits/:id',jwtCheck,bookedVisit);
route.post('/allBookings',allBookings);
route.post('/cancelBooking/:id',jwtCheck,cancelBooking);
route.post('/toFav/:id',jwtCheck,toFav);
route.post('/allFav',jwtCheck,allfavourites);
export {route as userRoute}