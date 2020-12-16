import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link, useHistory } from 'react-router-dom';

const Booking = (props) => {
  const history = useHistory();
  const [property, setProperty] = useState();
  const [user, setUser] = useState();

  const [booking, setBooking] = useState({
    checkinDate: '',
    checkoutDate: '',
  });

  useEffect(() => {
    api
      .get(`http://localhost:3000/properties/${props.match.params.id}`)
      .then((res) => {
        setProperty(res.data);
      });
  }, []);

  // useEffect(() => {
  //   api
  //     .get(`http://localhost:3000/users/${props.match.params.id}`)
  //     .then((res) => {
  //       setUser(res.data);
  //     });
  // }, []);

  const handleChange = (event) => {
    setBooking({
      ...booking,
      [event.target.name]: event.target.value,
    });
  };

  const submitBooking = (event) => {
    event.preventDefault();

    return api
      .post(`http://localhost:3000/properties/${property._id}/reserve`, {
        property: props.match.params.id,
        ...booking,
      })
      .then((res) => {
        history.push('/confirm-details');
        console.log('Property Uploaded Successfully');
      })
      .catch((err) => {
        alert('Upload Error');
      });
  };

  return (
    <section className="booking">
      <div className="container-xl ">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <h5 className="card-title py-2">Book your getaway</h5>
            <form onSubmit={submitBooking}>
              <div className="form-group">
                <small>Check in Date</small>
                <input
                  className="form-control py-4"
                  type="date"
                  name="checkinDate"
                  value={booking.checkinDate}
                  onChange={handleChange}
                />
                <small>Check out Date</small>
                <input
                  className="form-control py-4"
                  type="date"
                  name="checkoutDate"
                  value={booking.checkoutDate}
                  onChange={handleChange}
                />
              </div>
              <button className="form-control btn btn-primary text-white ">
                Book now
              </button>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
