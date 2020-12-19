import React, { useState, useContext } from 'react';
import { userContext } from '../contexts/User';
import api from '../services/api';
import { useHistory, Link } from 'react-router-dom';
import '../styles/Login.css';
import ValidatedSignupForm from './ValidatedSignupForm';

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

  const signupUser = (event) => {
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
            <ValidatedSignupForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
