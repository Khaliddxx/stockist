import React, { useState, useEffect, Suspense, useContext } from "react";
import "./Fulfillment.scss";
import axios from "axios";
import { Table, Dropdown } from "react-bootstrap";
import AddNewModal from "./AddNewModal";
import deletebtn from "../../Assets/delete.svg";
import editbtn from "../../Assets/edit.svg";
import plus from "../../Assets/plus.svg";
import { UserContext } from "../../App";

import { Modal, Button, Form } from "react-bootstrap";
import { backend } from "../../Context/Backend";

const Fulfillment = () => {
  const [orders, setOrders] = useState("");
  const [temp, setTemp] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const Auth = useContext(UserContext);

  const fetchData = async () => {
    const agentId = Auth.user.id;
    // console.log(pharmacyId);
    try {
      await axios.get(`${backend}/api/order/getAll`).then((res) => {
        setOrders(res.data);
        console.log(res.data);
        setLoading(false);
      });
      console.log(Auth);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [temp]);

  // Remember to only change the order status to "deleted"
  const deleteOrder = (id) => {
    console.log("remove by id");
    axios.post(`${backend}/api/order/remove/${id}`).then((res) => {
      setTemp(!temp);
    });
  };
  return (
    <div className="purchase">
      <div className="header">
        <h1 className="header-text">Fulfillment</h1>
        <h6 className="header-text">
          We manage storage and shipping to customers for you!
        </h6>
      </div>
      <>
        <div
          className="member-table"
          style={{
            marginBottom: "0px !important",
            overflow: "scroll",
            width: "90%",
            margin: "auto",
            borderRadius: "4px",
          }}
        >
          <Table striped hover fixed>
            <thead
              style={{
                position: "sticky",
                top: "0",
                backgroundColor: "#ff5628",
                color: "white",
                verticalAlign: "middle",
                position: "relative",
                // height: "20px !important",
              }}
              variant="dark"
            >
              <tr>
                <th className="theader">Product</th>
                <th className="theader">Quantity</th>
                <th className="theader">Status</th>
                <th className="theader">Date-Time</th>

                <th className="theader">Edit</th>
                <th className="theader" scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <Suspense>
              {loading && (
                <>
                  <br />
                  <br />

                  <div class="lds-hourglass"></div>
                </>
              )}
              {!orders && !loading && (
                <p style={{ textAlign: "center" }}>
                  There are no orders yet 😢
                </p>
              )}
              <tbody>
                {orders &&
                  orders
                    .slice(0)

                    .map((order, idx) => (
                      <tr>
                        {/* <td>
                          <img
                            style={{
                              width: "48px",
                              height: "48px",
                              objectFit: "contain",
                            }}
                            src={event.pictureUrl}
                            alt=""
                          />
                        </td> */}

                        <td>{order.productName}</td>
                        <td>{order.quantity}</td>
                        <td>{order.status}</td>
                        <td>{order.dateTime}</td>

                        <td>
                          <button
                            className="edit-btn"
                            // onClick={() => handleEdit(product)}
                          >
                            <img src={editbtn} alt="" />
                          </button>
                        </td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={(e) => deleteOrder(order._id)}
                          >
                            <img src={deletebtn} alt="delete button" />
                          </button>
                        </td>
                      </tr>
                    ))}
                <td></td>
              </tbody>
            </Suspense>
          </Table>
        </div>
      </>
    </div>
  );
};

export default Fulfillment;
