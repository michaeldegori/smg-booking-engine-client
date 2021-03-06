import './App.css';
import React, { useState, useContext } from 'react';
import { SignupContext } from './contexts/ShowSignup';
import { userContext } from './contexts/User';
import {
  Redirect,
  NavLink,
  Link,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Properties from './components/Properties';
import PropertyDetails from './components/PropertyDetails';
import Booking from './components/Booking';
import WalkerAirbnbCal from './components/WalkerAirbnbCal';
import WalkerVrboCal from './components/WalkerVrboCal';
import EasyAirbnbCal from './components/EasyAirbnbCal';
import EasyVrboCal from './components/EasyVrboCal';
import ConfirmBooking from './components/ConfirmBooking';
import BookingConfirmed from './components/BookingConfirmed';
import EasyDateRange from './components/EasyDateRange';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import ForgotPassword from './components/ForgotPassword';
import EditProperty from './components/EditProperty';
import AddProperty from './components/AddProperty';
import cabinGlyph from './images/cabin-glyph.png';
import contactGlyph from './images/contact-glyph.png';
import aboutGlyph from './images/about-glyph.png';
import logo from './images/smg-logo-blue-cabin-only.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const App = (props) => {
  const { setUser, user } = useContext(userContext);

  const [open, setOpen] = useState(false);
  const { setShowSignup, showSignup } = useContext(SignupContext);
  // const handleSignupClose = useSignupUpdate();
  // const handleSignupShow = useSignupUpdate();
  const [showLogin, setShowLogin] = useState(false);
  const history = useHistory();

  const handleSignupClose = () => setShowSignup(false);
  const handleSignupShow = () => setShowSignup(true);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const logout = () => {
    setOpen(!open);
    setUser(null);
    localStorage.removeItem('token');
    history.push('/home');
  };

  return (
    <div className="App">
      <header>
        <nav className="navbar navbar-expand-md fixed-top navbar-light bg-white p-0">
          <div className="container-fluid d-flex justify-content-center">
            <div className="navbar-header w-100 d-flex justify-content-between">
              <div className="col p-0">
                <NavLink
                  to="/home"
                  className="navbar-brand px-3 py-2"
                  onClick={() => {
                    if (open) {
                      setOpen(!open);
                    }
                  }}
                >
                  <img
                    className={`${open && 'burger-open'} logo`}
                    src={logo}
                    alt="smoky mountain getaways"
                  />
                </NavLink>
              </div>
              <div className="p-0 d-flex justify-content-end">
                <Button
                  className="d-md-none burger rounded-pill bg-transparent border-0 px-3 py-2 "
                  onClick={() => setOpen(!open)}
                  aria-controls="example-fade-text"
                  aria-expanded={open}
                >
                  <div
                    className={`${open && 'burger-open'} line1 rounded-pill`}
                  ></div>
                  <div
                    className={`${open && 'burger-open'} line2 rounded-pill`}
                  ></div>
                  <div
                    className={`${open && 'burger-open'} line3 rounded-pill`}
                  ></div>
                </Button>
              </div>
            </div>
            <div
              className={`${open && 'burger-open show'} ${
                !open && 'collapse'
              } navbar-collapse px-0`}
              id="navbarNav"
            >
              <div
                className={`bg-white ${
                  open && 'd-flex justify-content-center align-items-center'
                }`}
              >
                <ul
                  className=" navbar-nav text-center d-flex justify-content-between align-items-center pr-3"
                  style={{ width: '500px' }}
                >
                  <li className="nav-item my-3">
                    <NavLink
                      onClick={() => setOpen(!open)}
                      to="/home"
                      className="nav-link text-dark p-0"
                      activeClassName="highlight"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item my-3">
                    <NavLink
                      onClick={() => setOpen(!open)}
                      to="/properties"
                      className="nav-link text-dark p-0"
                      activeClassName="highlight"
                    >
                      Our cabins
                    </NavLink>
                  </li>
                  <li className="nav-item my-3">
                    <NavLink
                      onClick={() => setOpen(!open)}
                      to="/about"
                      className="nav-link text-dark p-0"
                      activeClassName="highlight"
                    >
                      About us
                    </NavLink>
                  </li>
                  {user ? (
                    <li className="nav-item my-3">
                      <button className="btn btn-sm btn-danger rounded-pill text-dark py-0 px-3">
                        <NavLink
                          to="/home"
                          className="nav-link text-light font-weight-bold"
                          activeClassName="highlight"
                          onClick={logout}
                        >
                          Log out
                        </NavLink>
                      </button>
                    </li>
                  ) : (
                    <>
                      <li className="nav-item my-3">
                        <button
                          className="btn btn-link p-0"
                          onClick={() => {
                            setOpen(!open);
                            handleSignupShow();
                          }}
                        >
                          Sign up
                        </button>

                        <Modal
                          centered
                          id="signup-modal"
                          show={showSignup}
                          onHide={handleSignupClose}
                          size="lg"
                        >
                          <Modal.Header className="h5" closeButton>
                            Sign up
                          </Modal.Header>
                          <Modal.Body>
                            <Signup />
                          </Modal.Body>
                          <hr />
                        </Modal>
                      </li>
                      <li className="nav-item my-3">
                        <button
                          className="btn btn-primary rounded-pill text-white"
                          onClick={() => {
                            setOpen(!open);
                            handleLoginShow();
                          }}
                        >
                          Log in
                        </button>

                        <Modal
                          centered
                          show={showLogin}
                          onHide={handleLoginClose}
                        >
                          <Modal.Header className="h5" closeButton>
                            Log in
                          </Modal.Header>
                          <Modal.Body>
                            <Login />
                          </Modal.Body>
                          <hr />
                        </Modal>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" render={(props) => <Home {...props} />} />
        <Route
          exact
          path="/properties"
          render={(props) => <Properties {...props} />}
        />
        <Route
          exact
          path="/easy"
          render={(props) => <EasyDateRange {...props} />}
        />
        <PrivateRoute
          exact
          path="/properties/add"
          render={(props) => <AddProperty {...props} />}
        />
        <Route
          exact
          path="/properties/:id"
          render={(props) => <PropertyDetails {...props} />}
        />
        <PrivateRoute
          exact
          path="/properties/:id/reserve"
          render={(props) => <Booking {...props} />}
        />
        <PrivateRoute
          exact
          path="/properties/:id/confirm-details"
          render={(props) => <ConfirmBooking {...props} />}
        />
        <Route
          exact
          path="/users/login"
          render={(props) => <Login {...props} />}
        />
        <Route
          exact
          path="/users/signup"
          render={(props) => <Signup {...props} />}
        />
        <Route
          exact
          path="/users/forgot-password"
          render={(props) => <ForgotPassword {...props} />}
        />
        <PrivateRoute
          exact
          path="/properties/edit/:id"
          render={(props) => <EditProperty {...props} />}
        />
        <PrivateRoute
          exact
          path="/walker-airbnb-cal"
          render={(props) => <WalkerAirbnbCal {...props} />}
        />
        <PrivateRoute
          exact
          path="/walker-vrbo-cal"
          render={(props) => <WalkerVrboCal {...props} />}
        />
        <PrivateRoute
          exact
          path="/easy-airbnb-cal"
          render={(props) => <EasyAirbnbCal {...props} />}
        />
        <PrivateRoute
          exact
          path="/easy-vrbo-cal"
          render={(props) => <EasyVrboCal {...props} />}
        />
        <Route exact path="/about" render={(props) => <About {...props} />} />
      </Switch>

      <div className="container w-100" style={{ height: '51px' }}></div>

      <footer
        className="d-md-none bg-primary fixed-bottom m-0"
        style={{ width: '100vw' }}
      >
        <div className="row">
          <div className="col">
            <Link
              to="/properties"
              className="my-1 d-flex flex-column align-items-center"
            >
              <img src={cabinGlyph} alt="properties" />
              <small className="text-dark m-0">Cabins</small>
            </Link>
          </div>
          <div className="col">
            <Link
              to="/about"
              className="my-1 d-flex flex-column align-items-center"
            >
              <img src={aboutGlyph} alt="about us" />
              <small className="text-dark m-0">About</small>
            </Link>
          </div>
          <div className="col">
            <Link
              to="/contact"
              className="my-1 d-flex flex-column align-items-center"
            >
              <img src={contactGlyph} alt="contact us" />
              <small className="text-dark m-0">Contact</small>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
