import { useEffect } from "react";
import {
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems, paymentMethod, shippingAddress } = cart;
  const { address, postalCode, city, country } = shippingAddress;

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );
  cart.taxPrice = addDecimals(0.08 * cart.itemsPrice);
  cart.shippingPrice = addDecimals(0.05 * cart.itemsPrice);
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, error, order } = orderCreate;

  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    } else if (success) {
      navigate(`/order/${order._id}`);
    }

    //eslint-disable-next-line
  }, [paymentMethod, navigate, success]);

  const placeOrderHandler = () => {
    const {
      cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = cart;
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps stepA stepB stepC stepD />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {address}, {city}, {postalCode}, {country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Item</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message>{error}</Message>}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn btn-block"
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
