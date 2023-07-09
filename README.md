# E-Commerce-Website
This project is developed as part of DBMS course. The objective is to develop an E-commerce website that allows users, sellers, admin to perform certain tasks and has functionalities like purchases (using dummy banks), item tracking  etc.
MERN stack is used for developing the website. As this mainly focuses on the database design and backend functionalities, the website is developed with a very minimalistic UI.

## Features
* Register Customer
* Register Seller
* Seller can add or delete item types and quantity
* Each customer can add items to his/her cart
* Each customer can modify his/her cart 
* Dummy interface to pay for items
* Dummy bank with customer accounts and amount
* Bank accounts can be added or deleted
* One customer can have account in 2 or 3 banks
* During Payment, bank selection interface is displayed
* Item delivery tracking (To see the results quickly i.e., the item moving from one warehouse to another is done in a way that, if you click the button in the page again, the item moves to the next warehouse)
* Add or modify multiple warehouses
* For each selected item, randomly choose warehouse path
* Item moves from one warehouse to another
* Upon final arrival, OTP code should be entered by the customer in the web interface (customer login) to receive item
* OTP is displayed on the screen when you click the "Get OTP" button for simplicity
* Seller dashboard to indicates all the products owned by the seller
* Each seller to have an inventory of different types of items of different quantities that change dynamically as purchase happens
* Platform should have a bank account and enjoy commission on each transaction

## Database Design Details
* As this is a DBMS project, even though I am using MongoDB (non-relational database), I designed the schemas in a way that it follows the Normal forms. 
* For demonstrating the topics learnt, I created separate schemas for orders, carts etc, which will have the userID, productID pointing to those specific users and products (usage of foreign key)
* During payment, it will create a new transaction and a new order, and deletes items present in the cart. The transaction is done in a way that, if it fails in the middle due to some issue at one of the items, all the commits that we have done during this purchase are rolled back and goes back to inital state.

## Installation Instructions
* Install Nodejs and MongoDB
* git clone <repository link>
* Open split terminal in the E-Commerce-Website directory
* Run **cd frontend** in one terminal and **cd backend** in another terminal (To move into the frontend and backend directories)
* Run the command **npm i** in both the terminals (To install the dependencies)
* In the frontend directory terminal, run **npm start**
* In the backend directory terminal, run **node server.js**
