import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';
import '../styles/EditProperty.css';

const AddProperty = (props) => {
  const history = useHistory();

  const [photoFiles, setPhotoFiles] = useState({
    photos: null,
  });

  const [propertyDetails, setPropertyDetails] = useState({
    bedrooms: null,
    bathrooms: null,
    listingTitle: '',
    description: '',
    maxGuests: null,
    address: '',
    directions: '',
    checkinInstructions: '',
    wifiDetails: '',
    houseManual: '',
    houseRules: '',
    cancellationPolicy: '',
  });

  const handlePhotoFiles = (event) => {
    setPhotoFiles({
      photos: event.target.files[0],
    });
  };

  const handleChange = (event) => {
    setPropertyDetails({
      ...propertyDetails,
      [event.target.name]: event.target.value,
    });
  };

  const submit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('photos', photoFiles.photos);

    Object.keys(propertyDetails).forEach((detailKey) => {
      formData.append(detailKey, propertyDetails[detailKey]);
    });

    return api
      .post(`${process.env.REACT_APP_BACKEND}properties`, formData)
      .then((res) => {
        history.push('/properties');
        console.log('Property Uploaded Successfully');
      })
      .catch((err) => {
        alert('Upload Error');
      });
  };

  return (
    <section className="add-property">
      <div className="container-xl ">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <h5 className="card-title py-2">Add new property</h5>
            <form onSubmit={submit}>
              <div className="form-group">
                <div className="form-group">
                  <small>Photos</small>
                  <input
                    type="file"
                    name="photos"
                    onChange={handlePhotoFiles}
                  />
                </div>
                <small>Bedrooms</small>
                <input
                  className="form-control py-4"
                  type="number"
                  name="bedrooms"
                  placeholder="# of bedrooms"
                  value={propertyDetails.bedrooms}
                  onChange={handleChange}
                />
                <small>Bathrooms</small>
                <input
                  className="form-control py-4"
                  type="number"
                  name="bathrooms"
                  placeholder="# of bathrooms"
                  value={propertyDetails.bathrooms}
                  onChange={handleChange}
                />
                <small>Title</small>
                <input
                  className="form-control py-4"
                  name="listingTitle"
                  placeholder="listing title"
                  value={propertyDetails.listingTitle}
                  onChange={handleChange}
                />
                <small>Description</small>
                <textarea
                  className="form-control py-4"
                  name="description"
                  placeholder="description"
                  value={propertyDetails.description}
                  onChange={handleChange}
                />
                <small>Address</small>
                <input
                  className="form-control py-4"
                  name="address"
                  placeholder="address"
                  value={propertyDetails.address}
                  onChange={handleChange}
                />
                <small>Max guests</small>
                <input
                  className="form-control py-4"
                  type="number"
                  name="maxGuests"
                  placeholder="max # of guests"
                  value={propertyDetails.maxGuests}
                  onChange={handleChange}
                />
                <small>Directions</small>
                <textarea
                  className="form-control py-4"
                  name="directions"
                  placeholder="directions"
                  value={propertyDetails.directions}
                  onChange={handleChange}
                />
                <small>Check in instructions</small>
                <textarea
                  className="form-control py-4"
                  name="checkinInstructions"
                  placeholder="checkin instructions"
                  value={propertyDetails.checkinInstructions}
                  onChange={handleChange}
                />
                <small>Wifi details</small>
                <textarea
                  className="form-control py-4"
                  name="wifiDetails"
                  placeholder="wifi info"
                  value={propertyDetails.wifiDetails}
                  onChange={handleChange}
                />
                <small>House manual</small>
                <input
                  className="form-control py-4"
                  name="houseManual"
                  placeholder="house manual link"
                  value={propertyDetails.houseManual}
                  onChange={handleChange}
                />
                <small>House rules</small>
                <textarea
                  className="form-control py-4"
                  name="houseRules"
                  placeholder="house rules"
                  value={propertyDetails.houseRules}
                  onChange={handleChange}
                />
                <small>Cancellation Policy</small>
                <textarea
                  className="form-control py-4"
                  name="cancellationPolicy"
                  placeholder="cancellation policy"
                  value={propertyDetails.cancellationPolicy}
                  onChange={handleChange}
                />
              </div>
              <button className="form-control btn btn-primary text-white ">
                Submit property
              </button>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProperty;
