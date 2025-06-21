
// import asyncHandler from 'express-async-handler'
// import { prisma } from '../config/prismaConfig.js'

// export const createUser=asyncHandler(async (req,res) => {
//     console.log('creating user ');

//     let {email}=req.body;
//     const userExists=await prisma.user.findUnique({where:{email:email}})
//     if(!userExists){
//         const user=await prisma.user.create({data:req.body});
//         res.send({
//             message:"User registerd Successfully",
//             user:user,
//         })
//     }
//     else res.send(201).json({message:"User already registerd"})
    
// })

// export const bookVisit=asyncHandler(async (req,res) =>{
//     const {email,date}=req.body;
//     const {id}=req.params;
//     try {
//         const alreadyBooked=await prisma.user.findUnique({
//             where:{email},
//             select:{bookedVisits:true}
//         })
//         if(alreadyBooked.bookedVisits.some((visit)=>visit.id===id)){
//             res.status(400).json({message:'This residency is already bookrd by you'})
//         }
//         else{
//             await prisma.user.update({
//                 where:{email:email},
//                 data:{
//                     bookedVisits:{push:{id,date}}
//                 }
//             })
//             res.send("your visit is booked Successfully")
//         }
        
//     } catch (error) {
//         throw new Error(error.message)
//     }
// })

// export const getAllBookings=asyncHandler(async (req,res) =>{
//     const {email}=req.body;
//     try {
//         const bookings=await prisma.user.findUnique({
//             where:{email},
//             select:{bookedVisits:true}
//         })
//         res.status(200).send(bookings)
//     } catch (error) {
//         throw new Error(error.message)
//     }
// })

// export const cancelBooking=asyncHandler(async (req,res) =>{
//     const {email}=req.body;
//     const {id}=req.params;
//     try {
//         const user=await prisma.user.findUnique({
//             where:{email:email},
//             select:{bookedVisits:true}
//         })
//         const index=user.bookedVisits.findIndex((visit)=>visit.id===id)
//         if(index===-1){
//             res.send(404).json({message:"Bookings not found"})
//         }
//         else{
//             user.bookedVisits.splice(index,1)
//             await prisma.user.update({
//                 where:{email},
//                 data:{
//                     bookedVisits:user.bookedVisits
//                 }
//             })
//             res.send("Booking cancelled Successfully")
//         }
//     } catch (error) {
//         throw new Error(error.message)
//     }
// })


// export const toFav=asyncHandler(async (req,res) =>{
//     const {email}=req.body;
//     const {rid}=req.params;
//     try {
//         const user = await prisma.user.findUnique({
//             where:{email},

//         })
//         if(user.favResidenciesID.includes(rid)){
//             const updatedUser=await prisma.user.update({
//                 where:{email},
//                 data:{
//                     favResidenciesID:{
//                         set:user.favResidenciesID.filter((id)=>id!==rid)
//                     }
//                 }
//             })
//             res.send({message:"removed from favourites",user:updatedUser})
//         }
//         else{
//             const updatedUser=await prisma.user.update({
//                 where:{email},
//                 data:{
//                     favResidenciesID:{
//                         push:rid
//                     }
//                 }
//             })
//             res.send({message:"Updated favourites",user:updatedUser})
//         }
//     } catch (error) {
//         throw new Error(error.message)
//     }
// })


// export const allFav=asyncHandler(async (req,res) =>{
//     const {email}=req.body;
//     try {
//         const favResd=await prisma.user.findUnique({
//             where:{email},
//             select:{favResidenciesID:true}
//         })
//         res.status(200).send(favResd)
//     } catch (error) {
//         throw new Error(error.message)
//     }
// })

import asyncHandler from 'express-async-handler';
import  {prisma}  from '../config/prismaConfig.js';
export const createUser = asyncHandler(async (req, res) => {
    console.log('User registration');

    let {email} = req.body;

    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if(!userExists){
        let newUser = await prisma.user.create({
            data: {
                email: email
            }
        });
        res.status(200).json({
            message: 'User created successfully',
            data: newUser
        });
    }else{res.status(201).send('User already exists');}
});

export const bookedVisit = asyncHandler(async (req, res) => {
    const {email,date}=req.body;
    const id=req.params.id;
    // console.log(req.params);

    try {
        const alreadyBooked = await prisma.user.findUnique({
            where:{email:email},
            select:{
                bookedVisits:true
            }
        });
        if(alreadyBooked.bookedVisits.some(visit => visit.id === id)){
            res.status(400).send('Visit already booked by you');
        }else{
            await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    bookedVisits: {
                        push: {
                            id: id,
                            date: date
                        }
                    }
                }
            });
            res.status(200).send('Visit booked successfully');
        }
        
    } catch (error) {
        throw new Error(error.message);
    }

    
});

export const allBookings = asyncHandler(async (req, res) => {
    const {email}=req.body;

    const bookings=await prisma.user.findUnique({
        where:{email:email},
        select:{
            bookedVisits:true
        }
    });
    res.status(200).json({
        message:'All bookings',
        data:bookings
    });
});

export const cancelBooking = asyncHandler(async (req, res) => {
    const {email}=req.body;
    const id=req.params.id;
    
    const user=await prisma.user.findUnique({
        where:{email:email},
        select:{
            bookedVisits:true
        }
    });

    const index=user.bookedVisits.findIndex(visit => visit.id === id);
    if(index !== -1){
        user.bookedVisits.splice(index,1);
        await prisma.user.update({
            where:{email:email},
            data:{
                bookedVisits:user.bookedVisits
            }
        });
        res.status(200).send('booking cancelled successfully');
    }else{
        res.status(400).send('booking not found');
    }
});

export const toFav=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const id=req.params.id;
    const user=await prisma.user.findUnique({
        where:{email:email},
    });
    try {
        if(user.favResidenciesID.includes(id)){
            await prisma.user.update({
                where:{email:email},
                data:{
                    favResidenciesID:{
                        set:user.favResidenciesID.filter(fav => fav !== id)
                    }
                }
            });
            res.status(200).send('Removed from favourites');
        }else{
            await prisma.user.update({
                where:{email:email},
                data:{
                    favResidenciesID:{
                        push:id
                    }
                }
            });
            res.status(200).send('Added to favourites');
        }
    } catch (error) {
        throw new Error(error.message);
    }

});

export const allfavourites=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const user=await prisma.user.findUnique({
        where:{email:email},
        select:{
            favResidenciesID:true
        }
    });
    res.status(200).json({
        message:'All favourites',
        data:user
    });
});