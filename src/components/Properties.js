import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../contexts/User';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Properties.css';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
require('dotenv').config();

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 35.7897,
  lng: -83.5585,
};

const Properties = (props) => {
  const { user } = useContext(userContext);
  const [properties, setProperties] = useState([]);
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BACKEND}properties`)
      .then((res) => setProperties(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(process.env.REACT_APP_MAPS_KEY);
  const listProperties = () => {
    return properties?.map((property) => {
      return (
        <div className="card mb-3 border-0">
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
            <div className="row d-flex justify-between">
              <div className="col">
                <p className="card-text text-dark">
                  {property?.maxGuests} guests
                </p>
              </div>
              <div className="col">
                <p className="card-text text-dark">
                  {property?.bedrooms} bedrooms
                </p>
              </div>
              <div className="col">
                <p className="card-text text-dark">
                  {property?.bathrooms} baths
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
      );
    });
  };

  return (
    <section className="properites">
      <div className="container-fluid py-3">
        <h3 className="text-dark">Stays in the Great Smokies</h3>
        <div className="row mt-4">
          <div
            className="col-md-7"
            style={{
              minWidth: '500px',
            }}
          >
            {listProperties()}{' '}
            {user && (
              <Link to="/properties/add">
                <button className="btn btn-primary text-white">
                  Add New Property
                </button>
              </Link>
            )}
          </div>
          <div
            className="col-md-5 position-fixed"
            style={{
              top: '70px',
              right: 0,
            }}
          >
            <LoadScript googleMapsApiKey={process.env.MAPS_KEY}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                {/* Child components, such as markers, info windows, etc. */}
                <></>
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Properties;
