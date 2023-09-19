import React, { useState, useEffect, Suspense, useContext } from "react";
import "./Purchase.scss";
import axios from "axios";
import { Table, Dropdown } from "react-bootstrap";
import AddNewModal from "./AddNewModal";
import deletebtn from "../../Assets/delete.svg";
import editbtn from "../../Assets/edit.svg";
import plus from "../../Assets/plus.svg";
import { UserContext } from "../../App";

import { Modal, Button, Form } from "react-bootstrap";
import { backend } from "../../Context/Backend";

// const EditModal = ({
//   show,
//   handleClose,
//   product,
//   handleUpdate,
//   temp,
//   setTemp,
//   editProduct,
//   updateProduct,
//   setEditingProductId,
// }) => {
//   const p = product?.price || 0;
//   const [price, setPrice] = useState(p);
//   const [category, setCategory] = useState(product?.category || "");
//   const [stock, setStock] = useState(product?.stock || 0);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     editProduct({
//       ...product,
//       price,
//       category,
//       stock,
//     });

//     setTemp(!temp);
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Event</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="price">
//             <Form.Label>Price</Form.Label>
//             <Form.Control
//               type="number"
//               step="0.01"
//               placeholder="Enter price"
//               value={price}
//               onChange={(e) => setPrice(parseFloat(e.target.value))}
//             />
//           </Form.Group>
//           <Form.Group controlId="category">
//             <Form.Label>Category</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="stock">
//             <Form.Label>Stock</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter stock"
//               value={stock}
//               onChange={(e) => setStock(parseInt(e.target.value))}
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Save changes
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

const Purchase = () => {
  const [orders, setOrders] = useState("");
  const [temp, setTemp] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [editingProduct, setEditingProduct] = useState(null);
  // const [showEditModal, setShowEditModal] = useState(false);

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

  // const handleEdit = (product) => {
  //   setEditingProduct(product);
  //   setShowEditModal(true);
  // };

  // const editProduct = (product) => {
  //   console.log(product);
  //   console.log("edit by id", product._id);
  //   // Make an API call to update the product details
  //   // with the new values
  //   axios
  //     .put(
  //       `${backend}api/product/edit/${product._id}`,
  //       {
  //         price: product.price,
  //         category: product.category,
  //         stock: product.stock,
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       // setEditingProductId("");
  //       setTemp(!temp);
  //     });
  // };

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
        <h1 className="header-text">Purchase</h1>
        <h6 className="header-text">
          Buy our products in bulk with special pricing.
        </h6>
      </div>
      <>
        {/* <EditModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          product={editingProduct}
          handleUpdate={(updatedProduct) => {
            editProduct(updatedProduct);
          }}
          temp={temp}
          setTemp={setTemp}
          setEditingProductId={setEditingProduct}
          editProduct={editProduct}
        /> */}
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
          {!orders && !loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <p style={{ textAlign: "center" }}>There are no orders yet 😢</p>
            </div>
          ) : (
            <>
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
            </>
          )}
          {show && (
            <AddNewModal
              show={show}
              setShow={setShow}
              temp={temp}
              setTemp={setTemp}
            />
          )}
          <button
            style={{
              position: "absolute",
              right: "5vw",
              marginTop: "24px",
            }}
            onClick={() => {
              setShow(!show);
            }}
            className="addNew"
          >
            <img src={plus} alt="add new product" />
            <p style={{ margin: "0px" }}>New Order</p>
          </button>
        </div>
      </>
    </div>
  );
};

export default Purchase;
