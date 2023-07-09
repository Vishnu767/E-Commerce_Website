import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Product = (props) => {

    const handleChange = async (e) => {
        if (e.target.value >= 1) {
            await axios.patch("http://localhost:5000/api/cart", {
                userId: localStorage.getItem("id"),
                productId: props.product._id,
                quantity: e.target.value
            }).then(res => {
                console.log(res.data);
                window.location.reload();
            }).catch(err => {
                console.error(err);
            })
        }
    }

    async function RemoveItem(pkey) {

        await axios.delete(`http://localhost:5000/api/cart/${localStorage.getItem("id")}/${pkey}`)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            }
            )
            .catch(err => {
                console.error(err);
            }
            )
        // window.location.reload();
    }

    return (
        <div className="border m-2">
                <p>Name: {props.product.name}</p>
                <p>Price: {Math.floor(props.product.price * 1.1)}</p>
                <p>Description: {props.product.description}</p>
                <p>Quantity:
                    <input className="quantity-input" type="number" onChange={handleChange} defaultValue={props.product.quantity} min={1} />
                </p>
                <button className="btn btn-danger" onClick={() => RemoveItem(props.product._id)}>Remove Item</button>
        </div>
    )
}



export default function Cart() {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);


    useEffect(() => {

        const myCart = async () => {
            let userId = localStorage.getItem("id");
            let cartDetails = [];

            await axios.get(`http://localhost:5000/api/cart/${userId}`)
                .then(res => {
                    console.log("CART: ", res.data);
                    cartDetails = res.data;
                })
                .catch(err => {
                    console.error(err);
                })

            let products = [];
            for (let i = 0; i < cartDetails.length; i++) {
                await axios.get(`http://localhost:5000/api/products/search/${cartDetails[i].productId}`)
                    // eslint-disable-next-line no-loop-func
                    .then(res => {
                        let curproduct = res.data;
                        curproduct.quantity = cartDetails[i].quantity;
                        products.push(curproduct);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
            
            setCart(products);
            let amt = 0;
            for (let i = 0; i < products.length; i++) {
                amt += Math.floor((products[i].price * cartDetails[i].quantity * 1.1));
            }
            setTotal(amt);
        }

        myCart();

    }, [])


    function getCart() {
        return cart.map((currentproduct) => {
            console.log(currentproduct);
            return <Product product={currentproduct} />
        })
    }

    return (
        <div>
            <h1 className="text-center">Cart</h1>
            {getCart()}
            {cart.length === 0 
            ? <h5 className="text-center">Cart is Empty</h5> 
            :    <div className="text-center">
                    <h5>Total Bill: {total}</h5>
                    <Link to='/user/payment'>
                        <button className="btn btn-success" onClick={() => {localStorage.removeItem("amount"); localStorage.setItem("amount", total)}}>Proceed to Pay</button>
                    </Link>
                </div>
            }
            
            
        </div>
    );
}