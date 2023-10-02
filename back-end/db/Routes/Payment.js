const express =require ("express");
const Router = express.Router();
const {add,verify} =require ("../Controllers/PaymentController");

Router.post("/payment",add )
Router.post("/payment/:id",verify )



module.exports=Router