const HttpError = require("../models/http-error");
const Transaction = require("../models/transaction");
const Cart = require("../models/cart");
const Product = require("../models/product");
const bankAccounts = require("../models/bankAccounts");
const Order = require("../models/order");
const sellerProducts = require("../models/sellerProduct");

const createTransaction = async(req, res, next) => {

    const { userAccountNumber, amount, userId } = req.body;


    // Get the current User's bank account
    let currentUserBankAccount;
    let adminBankAccount;
    try {
        let reqbank = await bankAccounts.find({ accountNumber: userAccountNumber });
        let reqadminbank = await bankAccounts.find({ accountNumber: "1592608437" });
        currentUserBankAccount = reqbank[0];
        adminBankAccount = reqadminbank[0];
        if(currentUserBankAccount.balance < amount){
            const error = new HttpError(
                "Transaction Failed! Insufficient balance. (From transaction-controller) ",
                500
            );
            return next(error);
        }
    } catch (err) {
        const error = new HttpError(
            "Transaction Failed! Fetching user bank account failed, please try again later. (From transaction-controller) ",
            500
        );
        return next(error);
    }
    console.log("CURRENT USER BANK ACCOUNT: ");
    console.log(currentUserBankAccount);

    // Get Cart Details with the userId
    let cart;
    try {
        cart = await Cart.find({ userId: userId });
    } catch (err) {
        const error = new HttpError(
            "Transaction Failed! Fetching cart failed, please try again later. (From transaction-controller) ",
            500
        );
        return next(error);
    }


    // Using the productId, get the price of the product
    let prices = [];
    let quantities = [];
    try {
        for(let i=0; i<cart.length; i++){
            let reqproduct = await Product.findById(cart[i].productId);
            prices.push(reqproduct.price);
            quantities.push(reqproduct.quantity);
        }
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Transaction Failed! Fetching product failed, please try again later. (From transaction-controller) ",
            500
        );
        return next(error);
    }
    console.log("PRICES: ", prices);

    // create the Products array
    let products = [];
    for(let i=0; i<cart.length; i++){
        try{
            products.push({
                productId: cart[i].productId,
                price: prices[i],
                quantity: cart[i].quantity
            });
        }catch(err){
            const error = new HttpError(
                "Transaction Failed! Fetching products failed, please try again later. (From transaction-controller) ",
                500
            );
            return next(error);
        }
    }
    console.log("PRODUCTS: ", products);

    // Get the sellerIds from the productId
    let allSellers = [];
    let productIDs = [];
    try {
        for(let i=0; i<products.length; i++){
            let reqproduct = await sellerProducts.find({ productId: products[i].productId });
            if(products[i].quantity > quantities[i]){
                const error = new HttpError(
                    "Transaction Failed! Insufficient quantity. (From transaction-controller) ",
                    500
                );
                return next(error);
            }else{
                reqproduct[0].quantity = reqproduct[0].quantity - products[i].quantity;
                productIDs.push(reqproduct[0].productId);
            }
            allSellers.push(reqproduct[0].sellerId);
        }
        for(let i=0; i<productIDs.length; i++){
            let productDetails = await Product.find({ _id: productIDs[i] });
            console.log("PRODUCT DETAILS BEFORE UPDATING QUANTITY: ", productDetails);
            productDetails[0].quantity = productDetails[0].quantity - products[i].quantity;
            console.log("BEFORE SAVING: ", productDetails);
            await productDetails[0].save();
        }
        // console.log("PRODUCT DETAILS AFTER UPDATING QUANTITY: ", productDetails);
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Transaction Failed! Fetching sellers failed, please try again later. (From transaction-controller) ",
            500
        );
        return next(error);
    }
    console.log("SELLERS OF THE PRODUCTS: ", allSellers);

    // Get the seller bank account from the sellerId
    let sellerBankAccounts = [];
    try {
        for(let i=0; i<allSellers.length; i++){
            let sellerBankAccount = await bankAccounts.find({ userId: allSellers[i] });
            sellerBankAccounts.push(sellerBankAccount[0]);
        }
    } catch (err) {
        const error = new HttpError(
            "Transaction Failed! Fetching seller account numbers failed, please try again later. (From transaction-controller) ",
            500
        );
        return next(error);
    }
    console.log("SELLER BANK ACCOUNTS: ", sellerBankAccounts);
    
    // Transfer money from user to seller
    let transactionsDone = 0;
    try {
        for(let i=0; i<sellerBankAccounts.length; i++){
            sellerBankAccounts[i].balance += (products[i].quantity * products[i].price);
            await sellerBankAccounts[i].save();
            transactionsDone++;
        }
    } catch (err) {
        for(let i=0; i<transactionsDone; i++){
            sellerBankAccounts[i].balance -= Math.floor(products[i].quantity * products[i].price);
            await sellerBankAccounts[i].save();
        }
        for(let i=0; i<products.length; i++){
            let bill = products[i].quantity * products[i].price;
            console.log("BILL: ", bill);
            let curTransaction = new Transaction({
                sellerAccountNumber: sellerBankAccounts[i].accountNumber,
                userAccountNumber: currentUserBankAccount.accountNumber,
                amount: bill,
                transactionStatus: "Failure"
            });
            await curTransaction.save();
        }
        console.log(err);
    }

    if(transactionsDone == sellerBankAccounts.length){
        currentUserBankAccount.balance -= amount;
        adminBankAccount.balance += Math.floor(amount/11);
        await currentUserBankAccount.save();
        await adminBankAccount.save();
        console.log("Transactions done! (From transaction-controller)\n");
    }else{
        const error = new HttpError(
            "Transaction Failed! Transfering money failed, please try again later. (From transaction-controller) ",
            500
        );
        return next(error);
    }

    
    // Create order
    let transactionsCreated = [];
    let ordersPlaced = [];
    try {

        // Determine Random Path for thr product
        for(let i=0; i<products.length; i++){
            let path = [];
            for(let j=0; j<4; j++){
                let rand = Math.floor(Math.random() * 6);
                let continue_loop = false;
                for(let k=0; k<path.length; k++){
                    if(rand == path[k]){
                        continue_loop = true;
                        break;
                    }
                }
                if(continue_loop){
                    continue;
                }
                path.push(rand);
            }
            let finalPath = [];
            for(let j=0; j<path.length; j++){
                // Add 'A' to path[j] and push it to finalPath
                finalPath.push("Warehouse-" + String.fromCharCode(path[j] + 65));
            }
            console.log("FINAL PATH: ", finalPath);

            // Create order
            let fullPrice = Math.floor(1.1 * prices[i]);
            let createdOrder = new Order({
                userId: userId,
                productId: products[i].productId,
                quantity: products[i].quantity,
                path: finalPath,
                price: fullPrice,
                status: "ON THE WAY",
                reachedWarehouseNumber: 0,
            });
            await createdOrder.save();
            ordersPlaced.push(createdOrder);
            let curTransaction = new Transaction({
                sellerAccountNumber: sellerBankAccounts[i].accountNumber,
                userAccountNumber: currentUserBankAccount.accountNumber,
                amount: products[i].quantity * products[i].price,
                transactionStatus: "Success"
            });
            await curTransaction.save();
            transactionsCreated.push(curTransaction);
        }
    } catch (err) {
        console.log(err);

        // Deleting all the orders placed in this purchase
        for(let i=0; i<ordersPlaced.length; i++){
            try {
                await Order.findByIdAndDelete(ordersPlaced[i].id);
            } catch (err) {
                const error = new HttpError(
                    "Transaction Failed! Couldn't place order, your money will be refunded. (From transaction-controller) ",
                    500
                );
                return next(error);
            }
        }

        // Marking all transactions in this purchase as failure
        for(let i=0; i<transactionsCreated.length; i++){
            try {
                sellerBankAccounts[i].balance -= (products[i].quantity * products[i].price * 0.9);
                await sellerBankAccounts[i].save();
                transactionsCreated[i].transactionStatus = "Failure";
                await transactionsCreated[i].save();
            } catch (err) {
                const error = new HttpError(
                    "Transaction Failed! Couldn't place order, your money will be refunded. (From transaction-controller) ",
                    500
                );
                return next(error);
            }
        }

        // Remaining transactions that are not created are now created and marked as Failure
        for(let i=transactionsCreated.length; i<sellerBankAccounts.length; i++){
            sellerBankAccounts[i].balance -= (products[i].quantity * products[i].price * 0.9);
            await sellerBankAccounts[i].save();
            let bill = products[i].quantity * products[i].price;
            let curTransaction = new Transaction({
                sellerAccountNumber: sellerBankAccounts[i].accountNumber,
                userAccountNumber: currentUserBankAccount.accountNumber,
                amount: bill,
                transactionStatus: "Failure"
            });
            await curTransaction.save();
        }

        // Refunding the user
        currentUserBankAccount.balance += amount;

        const error = new HttpError(
            "Transaction Failed! Creating order failed, please try again later. (From transaction-controller) ",
            500
        );
        return next(error);
    }

    // Deleting those items from cart if the payment is success and order is placed.
    try {
        for(let i=0; i<cart.length; i++){
            await Cart.findByIdAndDelete(cart[i].id);
        }
    } catch (err) {
        const error = new HttpError(
            "Transaction Failed! Deleting cart items failed, please try again later. (From transaction-controller) ",
            500
        );
        return next(error);
    }
    
    console.log("Saved transaction! (From transaction-controller)\n");
    res.send("Saved transaction! (From transaction-controller)\n");
}

exports.createTransaction = createTransaction;