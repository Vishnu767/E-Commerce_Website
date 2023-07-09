const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user-routes');
const sellerRoutes = require('./routes/seller-routes');
const productRoutes = require('./routes/product-routes');
const sellerProductRoutes = require('./routes/sellerProduct-routes');
const cartRoutes = require('./routes/cart-routes');
const bankRoutes = require('./routes/bank-routes');
const bankAccountRoutes = require('./routes/backAccount-routes');
const transactionRoutes = require('./routes/transaction-routes');
const orderRoutes = require('./routes/order-routes');
const warehouseRoutes = require('./routes/warehouse-routes');
const adminRoutes = require('./routes/admin-routes');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin , X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    next();
  });

app.use('/api/users/', userRoutes);
app.use('/api/sellers/', sellerRoutes);
app.use('/api/products/', productRoutes);
app.use('/api/seller-products/', sellerProductRoutes);
app.use('/api/cart/', cartRoutes);
app.use('/api/bank', bankRoutes);
app.use('/api/bank-account', bankAccountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/admin', adminRoutes);

// app.use((req, res, next) => {
//     const error = new HttpError("Could not find this route.", 404);
//     throw error;
//   });

//   app.use((error, req, res, next) => {
//     if (res.headerSent) {
//       return next(error);
//     }
//     res.status(error.code || 500);
//     res.json({ message: error.message || "An unknown error occurred!" });
//   });

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});