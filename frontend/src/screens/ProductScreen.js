import { useState, useEffect } from "react";
import axios from "axios";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
    };

    fetchProduct();
  }, [id]);

  const { image, name, rating, price, description, numReviews, countInStock } =
    product;
  return (
    <>
      <Link to="/" className="btn btn-light">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={image} alt={name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              {" "}
              <Rating value={rating} text={`${numReviews} reviews`} />{" "}
            </ListGroupItem>
            <ListGroupItem>Price : ${price}</ListGroupItem>
            <ListGroupItem>Description : ${description}</ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>{countInStock ? "In Stock" : "Out of Stock"}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={countInStock === 0}
                >
                  Add to cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
