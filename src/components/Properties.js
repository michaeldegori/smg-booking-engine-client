import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../contexts/User';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Properties.css';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: -3.745,
  lng: -38.523,
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

  const listProperties = () => {
    return properties?.map((property) => {
      return (
        <div className="col">
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
      <div className="container-fluid py-3">
        <h3 className="text-dark">Our properties</h3>
        <div className="row mt-4">
          <div className="col">
            {listProperties()}{' '}
            {user && (
              <Link to="/properties/add">
                <button className="btn btn-primary text-white">
                  Add New Property
                </button>
              </Link>
            )}
          </div>
          <div className="col-md-5 position-relative">
            <LoadScript googleMapsApiKey="YOUR_API_KEY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
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
