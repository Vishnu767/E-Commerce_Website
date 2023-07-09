import React, { useState } from "react";
import axios from "axios";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [opened, setOpened] = useState(false);
    const [otp, setOtp] = useState(0);
    const [mainOTP, setMainOTP] = useState(0);

    const handleOtpChange = (e) => {
        setOtp(Number(e.target.value));
    }

    const getOTP = () => {
        console.log("Old: ", mainOTP);
        let newOTP = Math.floor(Math.random()*8999 + 1000);
        setMainOTP(newOTP);
        window.alert("OTP is " + newOTP);
        // console.log("New: ", mainOTP);
    }

    async function verifyOTP(orderId) {
        if(mainOTP === 0){
            window.alert("Please generate OTP first");
        }else{
            // console.log(typeof(otp));
            // console.log(typeof(mainOTP));
            if(otp === mainOTP){
                await axios.patch(`http://localhost:5000/api/orders/update-status`, {
                    orderId: orderId
                })
                    .then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.error(err);
                    })
                window.alert("OTP Verified");
                window.location.reload();
            }else{
                // console.log("OTP: ", otp);
                // console.log("Main OTP: ", mainOTP);
                window.alert("Incorrect OTP");
            }
        }
    }

    const getOrders = async () => {
        try {
            if (opened === true) {
                for (let i = 0; i < orders.length; i++) {
                    console.log(orders[i]);
                    if (orders[i].reachedWarehouseNumber === orders[i].path.length) {
                        continue;
                    } else {
                        await axios.patch(`http://localhost:5000/api/orders/`, {
                            orderId: orders[i].orderId
                        })
                            .then(res => {
                                console.log(res);
                            }).catch(err => {
                                console.error(err);
                            })
                        
                            await axios.get(`http://localhost:5000/api/orders/${localStorage.getItem("id")}`)
                            .then(res => {
                                console.log(res);
                                setOrders(res.data);
                            }).catch(err => {
                                console.error(err);
                            })
                    }
                }
                window.location.reload();
            } else {
                setOpened(true);
                
                await axios.get(`http://localhost:5000/api/orders/${localStorage.getItem("id")}`)
                    .then(res => {
                        console.log(res);
                        setOrders(res.data);
                    }).catch(err => {
                        console.error(err);
                    })
            }

        } catch (err) {
            console.error(err);
        }
    }

    const TrackItem = (index) => {
        if(orders[index].reachedWarehouseNumber === orders[index].path.length && orders[index].status === "DELIVERED"){
            console.log("Delivered");
            return "Delivered";
        }else if(orders[index].reachedWarehouseNumber === orders[index].path.length && orders[index].status === "ON THE WAY"){
            return "Reached Destination";
        }else{
            return "Reached Till " + orders[index].path[orders[index].reachedWarehouseNumber];
        }
    }


    return (
        <div className="text-center container p-2">
            <button className="btn btn-primary" onClick={getOrders}>Click here to view your Orders</button>
            {orders.map((order, index) => {
                return <div className="m-3 border border-2 p-2">
                    <p>Item Name: {order.productName}</p>
                    <p>Item Price: Rs.{order.price}</p>
                    <p>Item Quantity: {order.quantity}</p>
                    <p>Item Description: {order.description}</p>
                    <p>Path: </p>
                    <p>Status: {order.status}</p>
                    {order.path.map((path) => {
                        return <div>
                            <p>{path}</p>
                        </div>
                    })}
                    <p>Order Tracking: {TrackItem(index)}</p>
                    {order.reachedWarehouseNumber === order.path.length && order.status === "ON THE WAY"
                    ? <div>
                        <button className="btn btn-warning m-2" onClick={getOTP}>Get OTP</button>
                        <input className="p-1 m-2" placeholder="Enter OTP" type="number" onChange={handleOtpChange} required />
                        <button className="btn btn-primary m-2" onClick={() => verifyOTP(order.orderId)}>Submit</button>
                    </div>
                    : null
                    }
                </div>
            })
            }
        </div>
    );
}