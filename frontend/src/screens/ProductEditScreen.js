import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {
  getProductDetails,
  resetUpdateProduct,
  updateProduct,
} from '../actions/productActions';

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success,
  } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/login');
    }

    if (success) {
      dispatch(resetUpdateProduct());
      navigate('/admin/products');
    } else {
      if (!product.name || id !== product._id) {
        dispatch(getProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInstock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, id, product, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to='/admin/products' className='btn btn-info my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId='name'>
              <FormLabel>Name</FormLabel>
              <FormControl
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='Enter Name'
              ></FormControl>
            </FormGroup>

            <FormGroup className='py-3' controlId='price'>
              <FormLabel>Price </FormLabel>
              <FormControl
                type='number'
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder='Enter Price'
              ></FormControl>
            </FormGroup>

            <FormGroup className='py-3' controlId='Image'>
              <FormLabel>Image </FormLabel>
              <FormControl
                type='text'
                onChange={(e) => setImage(e.target.value)}
                value={image}
                placeholder='Enter Image'
              ></FormControl>
              <FormControl
                type='file'
                custom
                label='Choose file'
                onChange={uploadFileHandler}
                controlId='formFile'
              ></FormControl>
              {uploading && <Loader />}
            </FormGroup>

            <FormGroup className='py-3' controlId='Brand'>
              <FormLabel>Brand </FormLabel>
              <FormControl
                type='text'
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                placeholder='Enter Price'
              ></FormControl>
            </FormGroup>

            <FormGroup className='py-3' controlId='Category'>
              <FormLabel>Category </FormLabel>
              <FormControl
                type='text'
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder='Enter Price'
              ></FormControl>
            </FormGroup>

            <FormGroup className='py-3' controlId='CountInStock'>
              <FormLabel>CountInStock </FormLabel>
              <FormControl
                type='number'
                onChange={(e) => setCountInStock(e.target.value)}
                value={countInStock}
                placeholder='Enter Price'
              ></FormControl>
            </FormGroup>

            <FormGroup className='py-3' controlId='Description'>
              <FormLabel>Description </FormLabel>
              <FormControl
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder='Enter Price'
              ></FormControl>
            </FormGroup>

            <Button type='submit' variant='primary' className='my-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
