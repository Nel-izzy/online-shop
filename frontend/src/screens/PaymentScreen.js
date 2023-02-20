import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Form, FormGroup, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps stepA stepB stepC />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel as="legend">Select Payment Method</FormLabel>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </FormGroup>

        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
