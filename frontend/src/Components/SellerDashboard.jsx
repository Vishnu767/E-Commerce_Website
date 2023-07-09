import React, { useState, useEffect } from "react";
import axios from 'axios';

const Product = (props) => {

    async function DeleteProduct(pkey) {

        await axios.delete(`http://localhost:5000/api/seller-products/${pkey}`)
            .then(res => {
                console.log(res.data);
            }
            )
            .catch(err => {
                console.error(err);
            }
            )

        await axios.delete(`http://localhost:5000/api/products/${pkey}`)
            .then(res => {
                console.log(res.data);
            }
            )
            .catch(err => {
                console.error(err);
            }
            )
            window.location.reload();
    }
    return (
        <div className="border m-2">
            <p>Name: {props.product.name}</p>
            <p>Price: {props.product.price}</p>
            <p>Description: {props.product.description}</p>
            <p>Quantity: {props.product.quantity}</p>
            <p>{props.pkey}</p>
            <button className="btn btn-danger" onClick={()=> {DeleteProduct(props.pkey)}}>Delete</button>
        </div>
    )
}

export default function SellerDashboard() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // fetch data from backend
        async function getProducts() {
            let seller;
            await axios.get(`http://localhost:5000/api/sellers/search/${localStorage.getItem("email")}`)
                .then(res => {
                    seller = res.data[0]._id;
                    console.log("SELLER FOUND!");
                    console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                })
            let sellerProducts = [];
            let my_products = [];

            await axios.get(`http://localhost:5000/api/seller-products/search/${seller}`)
                .then(res => {
                    sellerProducts = res.data;
                    console.log("PRODUCTS FOUND!");
                    console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                })
            
            for (let i = 0; i < sellerProducts.length; i++) {
                await axios.get(`http://localhost:5000/api/products/search/${sellerProducts[i].productId}`)
                    .then(res => {
                        my_products.push(res.data);
                        console.log("PRODUCT DETAILS RETRIEVED!");
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
            setProducts(my_products);
            // reload current page
        }
        getProducts();

    }, [products.length])

    function productsList() {
        console.log(products);
        return products.map((currentProduct) => {
            return <Product product={currentProduct} pkey={currentProduct._id} />
        })
    }

    return (
        <div>
            {/* Retreive data from backend */}
            <h1>Dashboard</h1>
            {productsList()}
        </div>
    );
}