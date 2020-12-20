import React, { useState, useContext } from 'react';
import { userContext } from '../contexts/User';
import api from '../services/api';
import { useHistory, Link } from 'react-router-dom';
import '../styles/Login.css';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';

const Signup = () => {
  const history = useHistory();
  const { setUser } = useContext(userContext);

  const [userSignup, setUserSignup] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setUserSignup({
      ...userSignup,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api
      .post(`${process.env.REACT_APP_BACKEND}users/signup`, userSignup)
      .then((response) => {
        console.log('User logged in!');
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        history.push(`/properties`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="signup">
      <div className="container-fluid ">
        <div className="row d-flex justify-content-center">
          <div className="col">
            <h6 className="text-danger">
              Finish signing up to book your first getaway!
            </h6>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                birthdate: '',
                phone: '',
                email: '',
                password: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                api
                  .post(`${process.env.REACT_APP_BACKEND}users/signup`, values)
                  .then((response) => {
                    console.log('User logged in!');
                    setUser(response.data.user);
                    localStorage.setItem('token', response.data.token);
                    history.push(`/properties`);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required('First name is required'),
                lastName: Yup.string().required('Last name is required'),
                birthdate: Yup.string().required('Birthday is required'),
                phone: Yup.string().required('Phone number is required'),
                email: Yup.string()
                  .email('Please enter a valid email')
                  .required('Email is required'),
                password: Yup.string()
                  .required('Password is required')
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/g,
                    'Please enter a valid password'
                  ),
              })}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;
                return (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-group">
                      <Form.Group className="form-group">
                        <Form.Control
                          className="form-control py-4"
                          name="firstName"
                          placeholder="First name"
                          value={values.firstName}
                          id="first-name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.firstName && touched.firstName && 'error'
                          }
                        />
                        {errors.firstName && touched.firstName && (
                          <small className="input-feedback text-danger">
                            {errors.firstName}
                          </small>
                        )}
                        <Form.Control
                          className="form-control py-4"
                          name="lastName"
                          placeholder="Last name"
                          value={values.lastName}
                          id="last-name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.lastName && touched.lastName && 'error'
                          }
                        />
                        <Form.Text className="text-muted">
                          Make sure it matches the name on your
                          government-issued ID
                        </Form.Text>

                        {errors.lastName && touched.lastName && (
                          <small className="input-feedback text-danger">
                            {errors.lastName}
                          </small>
                        )}
                      </Form.Group>
                      <Form.Group className="form-group">
                        <Form.Control
                          className="form-control py-4"
                          type="date"
                          name="birthdate"
                          placeholder="Birthday"
                          value={values.birthdate}
                          id="birthdate"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.birthdate && touched.birthdate && 'error'
                          }
                        />
                        <Form.Text className="text-muted">
                          You must be 25 or over to book with us, others won't
                          see your birthday
                        </Form.Text>
                        {errors.birthdate && touched.birthdate && (
                          <small className="input-feedback text-danger">
                            {errors.birthdate}
                          </small>
                        )}
                      </Form.Group>
                      <Form.Group className="form-group">
                        <Form.Control
                          className="form-control py-4"
                          type="tel"
                          name="phone"
                          placeholder="Phone"
                          id="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={errors.phone && touched.phone && 'error'}
                        />
                        <Form.Text className="text-muted">
                          U.S. phone numbers only, please
                        </Form.Text>
                        {errors.phone && touched.phone && (
                          <small className="input-feedback text-danger">
                            {errors.phone}
                          </small>
                        )}
                      </Form.Group>
                      <Form.Group className="form-group">
                        <Form.Control
                          className="form-control py-4"
                          name="email"
                          placeholder="Email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={errors.email && touched.email && 'error'}
                        />
                        <Form.Text className="text-muted">
                          We'll email you trip confirmations and receipts
                        </Form.Text>
                        {errors.email && touched.email && (
                          <small className="input-feedback text-danger">
                            {errors.email}
                          </small>
                        )}
                      </Form.Group>
                      <Form.Control
                        className="form-control py-4"
                        type="password"
                        name="password"
                        placeholder="Password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.password && touched.password && 'error'
                        }
                      />
                      <Form.Text className="text-muted">
                        Password must contain: at least 8 characters, 1
                        uppercase, 1 lowercase & 1 symbol
                      </Form.Text>
                      {errors.password && touched.password && (
                        <small className="input-feedback text-danger">
                          {errors.password}
                        </small>
                      )}
                    </Form.Group>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary text-white "
                      style={{ width: '100%' }}
                    >
                      Sign up
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
