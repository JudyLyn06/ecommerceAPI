const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

// Add the database connection
mongoose.connect("mongodb+srv://dbUser:dbUser@zuitt.ri5rh.mongodb.net/capstone3?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

// Server setup
const app = express();

const corsOptions = {
	origin: ['http://localhost:3000', 'https://zuitt-shop-eta.vercel.app/', 'https://zuitt-shop-1lnqwjf19-zuitt.vercel.app/'],
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//connect routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
});
