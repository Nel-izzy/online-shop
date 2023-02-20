import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [address, setAddress] = useState(shippingAddress.address);
  const [country, setCountry] = useState(shippingAddress.country);

  const saveShipping = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps stepA stepB />
      <h1>Shipping</h1>
      <Form onSubmit={saveShipping}>
        <FormGroup>
          <FormLabel>Address</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="Enter Address"
          ></FormControl>
        </FormGroup>

        <FormGroup className="py-3">
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="Enter City"
          ></FormControl>
        </FormGroup>

        <FormGroup className="py-3">
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
            placeholder="Enter Postal Code"
          ></FormControl>
        </FormGroup>

        <FormGroup className="py-3">
          <FormLabel>Country</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            placeholder="Enter Country"
          ></FormControl>
        </FormGroup>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
