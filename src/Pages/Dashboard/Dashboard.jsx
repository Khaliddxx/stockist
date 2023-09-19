import React, { useState, useEffect, Suspense } from "react";
import "./Dashboard.scss";

import dashboard from "../../Assets/dashboard.svg";
import cart from "../../Assets/cart-plus.svg";
import bag from "../../Assets/bag.svg";
import shop from "../../Assets/shop.svg";
import profile from "../../Assets/profile.svg";
import sales from "../../Assets/Overview/sales.svg";
import orders from "../../Assets/Overview/orders.svg";
import productsicon from "../../Assets/Overview/products.svg";

import AddNewModal from "../Fulfillment/AddNewModal";

import { UserContext } from "../../App";
import { useContext } from "react";

import Fulfillment from "../Fulfillment/Fulfillment";
import Marketing from "../Marketing/Marketing";
import Purchase from "../Purchase/Purchase";

const Dashboard = () => {
  const Auth = useContext(UserContext);
  const [page, setPage] = useState("Dashboard");

  console.log(Auth);

  return (
    <>
      {/* {Auth.user.isAuthenticated ? ( */}
      <div className="dashboard">
        <div className="left-panel">
          {/* <a href="/dashboard"> */}
          <button
            autoFocus="true"
            className="a"
            onClick={() => setPage("Dashboard")}
          >
            <img src={dashboard} alt="dashboard-icon" />
            Dashboard
          </button>
          <button
            autoFocus="true"
            className="a"
            onClick={() => setPage("Purchase")}
          >
            <img src={cart} alt="dashboard-icon" />
            Purchase
          </button>
          {/* </a> */}

          <button className="a" onClick={() => setPage("Fulfillment")}>
            <img src={bag} alt="events-icon" />
            Fulfillment
          </button>

          <button className="a" onClick={() => setPage("Marketing")}>
            <img src={shop} alt="profile-icon" />
            Marketing
          </button>
          {/* <button className="a" onClick={() => setPage("Profile")}>
            <img src={profile} alt="orders-icon" />
            Profile
          </button> */}
        </div>
        <div className="right-panel">
          {page == "Dashboard" && (
            <div className="overview">
              <div className="header">
                <h1 className="header-text">Dashboard</h1>
                {/* <h6 className="header-text">Buy our products in bulk with special pricing.</h6> */}
              </div>
              <div className="opacity">
                <div className="stat-cards">
                  <div className="card">
                    <img src={sales} alt="sales" />
                    <div className="text">
                      <p className="total">Total Orders</p>
                      <p className="amount">37</p>
                    </div>
                  </div>
                  <div className="card">
                    <img src={orders} alt="sales" />
                    <div className="text">
                      <p className="total">Total Customers</p>
                      <p className="amount">1,374</p>
                    </div>
                  </div>
                  <div className="card">
                    <img src={productsicon} alt="sales" />
                    <div className="text">
                      <p className="total">Total Fulfillments</p>
                      <p className="amount">1,219</p>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="soon">Coming soon! 🚀</h1>
            </div>
          )}

          {page == "Purchase" && <Purchase />}
          {page == "Fulfillment" && <Fulfillment />}
          {page == "Marketing" && <Marketing />}
          {/* {page == "Profile" && <Profile />} */}
        </div>
      </div>
      {/* ) : (
        <h1 className="loginpls">Please Log in 🔐</h1>
      )} */}
    </>
  );
};

export default Dashboard;
