import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../contexts/User';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Properties.css';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Carousel } from 'react-bootstrap';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh-70px)',
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
            <Carousel className="col-md-4" interval="100000000000">
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded"
                  src={property?.photos}
                  alt="First slide"
                  style={{ objectFit: 'cover' }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded"
                  src={property?.photos}
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded"
                  src={property?.photos}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
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
