import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  Form,
  Button,
  FormGroup,
  FormCheck,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser, resetUser } from '../actions/userActions';

const UserEditScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateAdmin = useSelector((state) => state.userUpdateAdmin);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success,
  } = userUpdateAdmin;

  useEffect(() => {
    if (success) {
      dispatch(resetUser());
      navigate('/admin/users');
    } else {
      if (!user.name || id !== user._id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, id, success, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/users' className='btn btn-info my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
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

            <FormGroup className='py-3' controlId='email'>
              <FormLabel>Email Address</FormLabel>
              <FormControl
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder='Enter Email'
              ></FormControl>
            </FormGroup>

            <FormGroup controlId='isadmin'>
              <FormCheck
                type='checkbox'
                label='is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></FormCheck>
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

export default UserEditScreen;
