 const express = require ("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")
const cors=require("cors")


dotenv.config()


mongoose.connect(
    process.env.MONGO_URL 
).then(()=>console.log("DB connection Successfull!")).catch((err)=>{
    console.log(err)
})
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000
app.listen(port,host, ()=>{
    console.log("Backend server is running")
})
  