import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../contexts/User';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Properties.css';

const Properties = (props) => {
  const { user } = useContext(userContext);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3000/properties')
      .then((res) => setProperties(res.data))
      .catch((err) => console.log(err));
  }, []);

  const listProperties = () => {
    return properties?.map((property) => {
      return (
        <div className="col-md-6">
          <div className="card mb-3">
            <img
              src={property?.photos}
              className="card-img-top"
              style={{
                height: '30vh',
                objectFit: 'cover',
              }}
              alt="..."
            />
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <p className="card-text text-dark">
                    Guests: {property?.maxGuests}
                  </p>
                </div>
                <div className="col">
                  <p className="card-text text-dark">
                    Beds: {property?.bedrooms}
                  </p>
                </div>
                <div className="col">
                  <p className="card-text text-dark">
                    Baths: {property?.bathrooms}
                  </p>
                </div>
              </div>
              <h5 className="card-title text-danger mt-2">
                {property?.listingTitle}
              </h5>
              <p className="card-text text-dark">{property?.description}</p>
            </div>

            <Link to={`/properties/${property?._id}`}>
              <button className="btn btn-primary text-white mb-4 mx-3">
                View cabin
              </button>
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="properites">
      <div className="container-xl py-3">
        <h3 className="text-dark">Our properties</h3>
        <div className="row mt-4">
          {listProperties()}{' '}
          {user && (
            <Link to="/properties/add">
              <button className="btn btn-primary text-white">
                Add New Property
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Properties;
