import React, { useState, useEffect } from "react";
import UserNavbar from "./UserNavbar";
import axios from 'axios';

const Product = (props) => {


  async function AddToCart(pkey) {
    console.log("PRODUCT KEY: ", pkey);
    let userId = localStorage.getItem("id");

    let check_product = 0;

    await axios.post("http://localhost:5000/api/cart/check-product", {
      productId: pkey,
      userId: userId
    }).then(res => {
        console.log("RESPONSE FOR CHECKING PRODUCT: ", res);
        console.log("LENGTH: ", res.data.length);
        check_product = res.data.length;
      })
      .catch(err => {
        console.error(err);
      })


      if(check_product === 1){
        console.log("PRODUCT ALREADY IN CART!");
        // give a window alert
        window.alert("Product already in cart!");
      }else{
        await axios.post("http://localhost:5000/api/cart/", {
          productId: pkey,
          userId: userId
        })
          .then(res => {
            console.log("PRODUCT ADDED TO CART!");
            console.log(res.data);
            window.alert("Product added to cart!");
          })
          .catch(err => {
            console.error(err);
          })
      }

  }
      

  return (
    <div className="border m-2">
      <p>Name: {props.product.name}</p>
      <p>Price: {Math.floor(props.product.price * (1.1))}</p>
      <p>Description: {props.product.description}</p>
      <p>Product ID: {props.pkey}</p>
      <button className="btn btn-success" onClick={() => AddToCart(props.pkey)}>Add to Cart</button>
    </div>
  )
}

export default function UsersPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch data from backend
    const getProducts = async () => {
      let sellerProducts = [];
      await axios.get("http://localhost:5000/api/seller-products/all")
        .then(res => {
          sellerProducts = res.data;
          console.log("-------");
          console.log("ALL SELLER-PRODUCTS RETRIEVED!");
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        })

      let all_products = [];
      for(let i=0; i<sellerProducts.length; i++) {
        await axios.get(`http://localhost:5000/api/products/search/${sellerProducts[i].productId}`)
          .then(res => {
            all_products.push(res.data);
            console.log("PRODUCT DETAILS RETRIEVED!");
            console.log(res.data);
          })
          .catch(err => {
            console.error(err);
          })
      }
      console.log("ALL PRODUCTS: ", all_products);
      setProducts(all_products);
      // console.log("UPDATED PRODUCTS: ", products);
    };

    getProducts();
  }, [])

  function productsList() {
    return products.map((currentProduct) => {
      return <Product product={currentProduct} pkey={currentProduct._id} />;
    })
  }

  return (
    <div>
      <UserNavbar />
        <h1>Users Page</h1>
        {productsList()}
    </div>
  );
}