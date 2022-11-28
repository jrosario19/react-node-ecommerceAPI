const router = require("express").Router()
const Stripe = require('stripe');

const dotenv = require("dotenv")


dotenv.config()
const stripe = Stripe(`${process.env.STRIPE_KEY}`);


router.post("/payment", (req, res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount: req.body.amount,
        currency:"usd",
    },(stripeErr, stripeRes )=>{
        if(stripeErr){
            res.status(500).json(stripeErr);

        }else{
            res.status(200).json(stripeRes);
        }
    })
})



module.exports = router;