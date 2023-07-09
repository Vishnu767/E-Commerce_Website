import React, { useState } from "react";
import { auth } from "../config/firebase";
import axios from 'axios';

export default function SellerCreateItem() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let seller;
        await axios.get(`http://localhost:5000/api/sellers/search/${auth.currentUser.email}`)
            .then(res => {
                seller = res.data[0]._id;
                console.log(seller);
            }).catch(err => {
                console.error(err);
            })
        // console.log(seller);
        const item = {
            name: name,
            price: price,
            description: description,
            quantity: quantity,
        }
        let productId;
        await axios.post('http://localhost:5000/api/products', item)
            .then(res => {
                productId = res.data.product._id;
            })
            .catch(err => {
                console.error(err);
            })

        await axios.post('http://localhost:5000/api/seller-products', { 
            productId: productId,
            sellerId: seller,
            productStatus: 0
        })
            .then(res => {
                console.log(res.data);
                window.alert('Item added successfully');
            })
            .catch(err => {
                console.error(err);
            })
        // Add Product to all-items
    }

    return (
        <div className="container p-2">
            <form onSubmit={handleSubmit}>
                <input className="item-name" placeholder="Enter the item name" type="text" onChange={handleNameChange} required />
                <input className="item-description" placeholder="Enter the Details" type="text" onChange={handleDescriptionChange} required />
                <input className="item-quantity" placeholder="Enter the quantity" type="number" onChange={handleQuantityChange} min={1} />
                <input className="price" placeholder="Enter the item price (in INR)" type="number" onChange={handlePriceChange} min={1} />
                <button className="btn btn-primary" type="submit">Add Item</button>
            </form>
        </div>
    );
}