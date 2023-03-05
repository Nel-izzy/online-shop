import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import Paginate from '../components/Paginate';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  listProducts,
  resetCreateProduct,
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const pageNumber = searchParams.get('pageNumber') || 1;

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    success: successDelete,
    error: errorDelete,
    loading: loadingDelete,
  } = useSelector((state) => state.productDelete);

  const {
    success: successCreate,
    error: errorCreate,
    loading: loadingCreate,
    product: newProduct,
  } = useSelector((state) => state.productCreate);

  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      dispatch(resetCreateProduct());
      navigate(`/admin/product/${newProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    newProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button variant='info' type='button' onClick={createProductHandler}>
            <i className='fas fa-plus' /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message>{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table bordered striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button className='btn-sm'>
                          <i className='fas fa-edit' />
                        </Button>
                      </LinkContainer>
                      <Button
                        className='btn-sm'
                        variant='danger'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fas fa-trash' />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
