import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserProfile, updateUserProfile } from "../actions/userActions";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  const updateUserHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserProfile("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, user, navigate, dispatch]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile </h2>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="warning">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={updateUserHandler}>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter Name"
            ></FormControl>
          </FormGroup>

          <FormGroup className="py-3">
            <FormLabel>Email Address</FormLabel>
            <FormControl
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Email"
            ></FormControl>
          </FormGroup>

          <FormGroup className="py-3">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter Password"
            ></FormControl>
          </FormGroup>

          <FormGroup className="py-3">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirm Password"
            ></FormControl>
          </FormGroup>

          <Button variant="primary" type="submit">
            Update Account
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
