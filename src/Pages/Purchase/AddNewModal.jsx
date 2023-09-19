import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./AddNewModal.scss";
import { UserContext } from "../../App";
import { backend } from "../../Context/Backend";

const AddNewModal = (props) => {
  const Auth = useContext(UserContext);
  const pharmacyId = Auth.user.id;
  const [imgStr, setImgStr] = useState([]);
  const [apply, setApply] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => props.setShow(false);
  const handleShow = () => props.setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data, e) => {
    setLoading(true);

    try {
      const url = `${backend}/api/order/create`;
      await axios({
        method: "post",
        headers: { "Access-Control-Allow-Origin": "*" },
        url: url,
        data: {
          productName: data.productName,
          quantity: data.quantity,
          dateTime: data.dateTime,
          status: "pending",
        },
      });
      console.log(data);
      props.setTemp(!props.temp);
      setLoading(false);
      handleClose();
      e.target.reset();
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
    props.setShow(props.show);
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Place New Order</Modal.Title>
        </Modal.Header>
        <form
          className="addNewCard container-fluid"
          onSubmit={handleSubmit(onSubmit)}
        >
          {!loading && (
            <Modal.Body>
              <div className="row">
                <div className="col">
                  <label>Product</label>
                  <br />
                  <select {...register("productName", { required: true })}>
                    <option label="Choose..."></option>
                    <option value="Egypt">PAP</option>
                    <option value="Egypt">The Other Thing</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Quantity</label> <br />
                  <input
                    type="number"
                    placeholder="Type..."
                    id="quantity"
                    {...register("quantity", { required: true })}
                  />
                </div>
              </div>

              {/* <div className="row">
                <div className="col">
                  <label>Date-Time</label> <br />
                  <input
                    type="datetime-local"
                    placeholder="Type..."
                    id="dateTime"
                    {...register("dateTime", { required: false })}
                  />
                </div>
              </div> */}
            </Modal.Body>
          )}

          {loading && <div className="loading lds-hourglass"></div>}
          <Modal.Footer>
            {loading ? (
              <>
                {error && <p>{error}</p>}
                <p>Please wait</p>
              </>
            ) : (
              <input type="submit" className="submit-btn" />
            )}

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AddNewModal;
