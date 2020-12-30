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
        <div>
          <hr className="my-4" />
          <div className="row mb-3 ml-0 border-0">
            <div
              id="carouselExampleIndicators"
              class="carousel slide"
              data-ride="carousel"
            >
              <ol class="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img class="d-block w-100" src="..." alt="First slide" />
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="..." alt="Second slide" />
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="..." alt="Third slide" />
                </div>
              </div>
              <a
                class="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
            <div
              className="col-4 rounded"
              style={{
                backgroundImage: `url("${property?.photos}")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '200px',
              }}
            ></div>
            <div className="col-8 pr-0">
              <div className="text-muted">Listing Title</div>
              <h5>{property?.listingTitle}</h5>
              <hr className="mx-0" style={{ width: '10%' }} />
              <div className="row pl-3 text-muted">
                {property?.maxGuests} guests &middot; {property?.bedrooms}{' '}
                bedrooms &middot; # beds &middot; {property?.bathrooms} baths
              </div>
              <div className="text-muted">
                Amenities &middot; Amenities &middot; Amenities &middot;
                Amenities
              </div>

              <Link to={`/properties/${property?._id}`}>
                <button className="btn btn-primary text-white">
                  View cabin
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="properites" style={{ paddingTop: '70px' }}>
      <div className="container-fluid py-3">
        <h3 className="text-dark">Stays in the Great Smokies</h3>
        <div className="row mt-4">
          <div
            className="col-md-8"
            style={{
              minWidth: '600px',
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
            className="col-md-4 position-fixed"
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
