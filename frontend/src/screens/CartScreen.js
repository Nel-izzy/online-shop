import { addToCart, removeCartItem } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSearchParams, useParams, useNavigate, Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Row, Col, Button, Image, FormControl, Card } from "react-bootstrap";
import Message from "../components/Message";

const CartScreen = () => {
  const [searchParams] = useSearchParams();
  const qtyParam = Number(searchParams.get("qty"));
  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;


  useEffect(() => {
    if (id) dispatch(addToCart(id, qtyParam));
  }, [dispatch, id, qtyParam]);

  const removeCartItemHandler = (id) => {
   dispatch(removeCartItem(id))
  }

  const checkOutHandler = () => {
    navigate(`/login?redirect=shipping`)
  }

  return <Row>
    <Col md={8}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? <Message>Your Cart is empty, <Link to ='/'>Continue shopping</Link></Message>: (
        <ListGroup variant="flush">
      {cartItems.map(item => {
        const {image, name, product, countInStock, price, qty} = item
        return <ListGroupItem key={product}>
            <Row>
              <Col md={2}>
                <Image  src={image} alt={name} fluid rounded/>
              </Col>
              <Col md={3}>
                <Link to={`/product/${product}`}>{name}</Link>
              </Col>
              <Col md={2}>${price}</Col>
              <Col md={2}>
              <FormControl as="select" value={qty} onChange={(e) => dispatch(addToCart(product, Number(e.target.value)))}>
             {[...Array(countInStock).keys()].map(q => (
               <option key={q+1} value={q+1}>{q+1}</option>
             ))}
               </FormControl>
              </Col>

              <Col md={2}>
                <Button type='button' variant="light" onClick={() => removeCartItemHandler(product)}>
                <i className="fas fa-trash"></i>
                </Button>
              </Col>
            </Row>
        </ListGroupItem>
      })}
        </ListGroup>
      ) }
    </Col>

    <Col md={4}>

      <Card>
        <ListGroup>
          <ListGroupItem>
            <h2>Subtotal: ({cartItems.reduce((acc, curr) =>  acc + curr.qty, 0)}) items</h2>
            ${cartItems.reduce((acc, curr) => acc + curr.qty*curr.price, 0).toFixed(2)}
          </ListGroupItem>
          <ListGroupItem>
            <Button type='button' className="btn-block" disabled = {cartItems.length === 0} onClick={checkOutHandler}>
       Proceed To Checkout
            </Button>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Col>
    
  </Row>;
};

export default CartScreen;
