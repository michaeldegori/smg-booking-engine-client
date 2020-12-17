import React, { useState, useContext } from 'react';
import { userContext } from '../contexts/User';
import api from '../services/api';
import { useHistory, Link } from 'react-router-dom';
import '../styles/Login.css';
import background from '../images/smoky-background.jpg';

const Signup = () => {
  const history = useHistory();
  const { setUser } = useContext(userContext);

  const [userSignup, setUserSignup] = useState({
    firstName: '',
    lastName: '',
    birthdate: Date.now(),
    phone: null,
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
    <section className="properites">
      <div className="container-xl ">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <h5 className="card-title py-2">Sign up</h5>
            <h6 className="text-danger">
              Finish signing up to book your first getaway!
            </h6>
            <form onSubmit={signupUser}>
              <div className="form-group">
                <div className="form-group">
                  <input
                    className="form-control py-4"
                    name="firstName"
                    placeholder="First name"
                    value={userSignup.firstName}
                    id="first-name"
                    onChange={handleChange}
                  />
                  <input
                    className="form-control py-4"
                    name="lastName"
                    placeholder="Last name"
                    value={userSignup.lastName}
                    id="last-name"
                    onChange={handleChange}
                  />
                  <small>
                    Make sure it matches the name on your government-issued ID.
                  </small>
                </div>
                <div className="form-group">
                  <input
                    className="form-control py-4"
                    type="date"
                    name="email"
                    placeholder="Birthday"
                    value={userSignup.birthdate}
                    id="birthdate"
                    onChange={handleChange}
                  />
                  <small>
                    You must be 25 or over to book with us. Other people won't
                    see your birthday.
                  </small>
                </div>
                <div className="form-group">
                  <input
                    className="form-control py-4"
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={userSignup.phone}
                    onChange={handleChange}
                  />
                  <small>U.S. phone numbers only, please.</small>
                </div>
                <div className="form-group">
                  <input
                    className="form-control py-4"
                    name="email"
                    placeholder="Email"
                    value={userSignup.email}
                    onChange={handleChange}
                  />
                  <small>
                    We'll email you trip confirmations and receipts.
                  </small>
                </div>
                <input
                  className="form-control py-4"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userSignup.password}
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn btn-primary text-white "
                style={{ width: '100%' }}
              >
                Sign up
              </button>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
