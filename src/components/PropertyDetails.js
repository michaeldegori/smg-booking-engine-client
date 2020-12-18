import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/PropertyDetails.css';
import EasyDateRange from './EasyDateRange';

const PropertyDetails = (props) => {
  const [property, setProperty] = useState();

  useEffect(() => {
    api
      .get(
        `${process.env.REACT_APP_BACKEND}properties/${props.match.params.id}`
      )
      .then((res) => {
        setProperty(res.data);
      });
  }, []);

  return (
    <section className="property-details">
      <div className="container-fluid container py-3">
        <h3 className="text-dark">{property?.listingTitle}</h3>
        <div className="card px-2 mb-3">
          <div className="row my-3">
            <div className="col-md-6 d-md-flex align-items-center">
              <img
                src={property?.photos}
                className="card-img-top rounded img-fluid"
                alt="..."
              />
            </div>
            <div className="col-md-6">
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
          </div>
        </div>
        <div className="card px-2 mb-3">
          <div className="row my-3">
            <div className="col-md-6">
              <EasyDateRange />
              <button className="btn btn-primary text-white form-control">
                Next
              </button>
            </div>
          </div>
        </div>

        <Link to={`/properties/edit/${property?._id}`}>
          <button className="btn btn-primary text-white">Edit Property</button>
        </Link>
      </div>
    </section>
  );
};

export default PropertyDetails;
