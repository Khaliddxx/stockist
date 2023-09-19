import React, { useState, useEffect, Suspense, useContext } from "react";
import "./Marketing.scss";
import axios from "axios";
import { Table } from "react-bootstrap";
// import AddNewModal from "./AddNewModal";

import deletebtn from "../../Assets/delete.svg";
import plus from "../../Assets/plus.svg";
import { UserContext } from "../../App";

const Marketing = () => {
  const [orders, setOrders] = useState();
  const [temp, setTemp] = useState(false);
  const [show, setShow] = useState(false);

  const Auth = useContext(UserContext);

  useEffect(() => {
    // const pharmacyId = Auth.user.id;
    // axios.get(`/api/orders/pharmacy-orders/${pharmacyId}`).then((res) => {
    //   setOrders(res.data.orders);
    //   console.log(res.data.orders);
    // });
  }, []);

  const deleteProduct = (id) => {
    console.log("remove by id");
    axios.post(`/api/product/remove/${id}`).then((res) => {
      setTemp(!temp);
    });
  };
  return (
    <div className="orders">
      <div className="header">
        <h1 className="header-text">Marketing</h1>
        <h6 className="header-text">
          Discover our proven marketing strategies.
        </h6>
      </div>
    </div>
  );
};

export default Marketing;
