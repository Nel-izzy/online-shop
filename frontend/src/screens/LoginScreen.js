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
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { loginUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [searchParams] = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const redirect = redirectParam ? `/${redirectParam}` : "/";
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={loginHandler}>
        <FormGroup>
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

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer ?{" "}
          <Link
            to={redirectParam ? `/signup?redirect=${redirectParam}` : "/signup"}
          >
            Sign Up
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
