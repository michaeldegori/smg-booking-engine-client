import React, { useState, useContext } from 'react';
import { userContext } from '../contexts/User';
import api from '../services/api';
import { useHistory, Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const history = useHistory();
  const { setUser } = useContext(userContext);

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
  };

  const loginUser = (event) => {
    event.preventDefault();

    api
      .post(`${process.env.REACT_APP_BACKEND}users/login`, userLogin)
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
    <section className="login">
      <div className="container-xl ">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <h5 className="card-title py-2">Log in</h5>
            <form onSubmit={loginUser}>
              <div className="form-group">
                <div className="form-group">
                  <input
                    className="form-control py-4"
                    name="email"
                    placeholder="Email"
                    value={userLogin.email}
                    onChange={handleChange}
                  />
                  <input
                    className="form-control py-4"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userLogin.password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="btn btn-primary text-white "
                  style={{ width: '100%' }}
                >
                  Log in
                </button>
              </div>
            </form>
            <hr />
            <small>
              <Link to="/users/forgot-password">Forgot password?</Link>
              <p>
                Dont have an account yet? <Link to="signup">Sign up</Link>
              </p>
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
