import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';
import '../styles/EditProperty.css';

const EditProperty = (props) => {
  const history = useHistory();

  const [photoFiles, setPhotoFiles] = useState(null);
  const [propertyEdit, setPropertyEdit] = useState({
    bedrooms: 0,
    bathrooms: 0,
    listingTitle: '',
    description: '',
    maxGuests: 0,
    address: '',
    directions: '',
    checkinInstructions: '',
    wifiDetails: '',
    houseManual: '',
    houseRules: '',
    cancellationPolicy: '',
  });

  useEffect(() => {
    api
      .get(
        `${process.env.REACT_APP_BACKEND}properties/${props.match.params.id}`
      )
      .then((res) => {
        setPropertyEdit(res.data);
      })
      .catch((err) => {});
  }, []);

  const handlePhotoFiles = (event) => {
    setPhotoFiles(event.target.files[0]);
  };

  const handleChange = (event) => {
    setPropertyEdit({
      ...propertyEdit,
      [event.target.name]: event.target.value,
    });
  };

  const uploadPhotos = () => {
    const formData = new FormData();
    formData.append('photos', photoFiles);

    return api
      .put(
        `${process.env.REACT_APP_BACKEND}properties/${propertyEdit._id}/photos`,
        formData
      )
      .then((res) => alert('Photos Uploaded Successfully'))
      .catch((err) => {
        alert('Upload Error');
      });
  };

  const submitEditProperty = (event) => {
    return api
      .put(
        `${process.env.REACT_APP_BACKEND}properties/${propertyEdit._id}`,
        propertyEdit
      )
      .then((res) => {
        console.log('Property Updated');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function submit(event) {
    event.preventDefault();
    Promise.all([submitEditProperty(), uploadPhotos()])
      .then(() => {
        history.push(`/properties/${propertyEdit._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="edit-property">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h5 className="card-title py-2">Edit property</h5>
            <form onSubmit={submit}>
              <div className="form-group">
                <small>Photos</small>
                <input type="file" name="photos" onChange={handlePhotoFiles} />
                <small>Bedrooms</small>
                <input
                  className="form-control py-4"
                  type="number"
                  name="bedrooms"
                  placeholder="# of bedrooms"
                  value={propertyEdit.bedrooms}
                  onChange={handleChange}
                />
                <small>Bathrooms</small>
                <input
                  className="form-control py-4"
                  type="number"
                  name="bathrooms"
                  placeholder="# of bathrooms"
                  value={propertyEdit.bathrooms}
                  onChange={handleChange}
                />
                <small>Title</small>
                <input
                  className="form-control py-4"
                  name="listingTitle"
                  placeholder="listing title"
                  value={propertyEdit.listingTitle}
                  onChange={handleChange}
                />
                <small>Description</small>
                <textarea
                  className="form-control py-4"
                  name="description"
                  placeholder="description"
                  value={propertyEdit.description}
                  onChange={handleChange}
                />
                <small>Address</small>
                <input
                  className="form-control py-4"
                  name="address"
                  placeholder="address"
                  value={propertyEdit.address}
                  onChange={handleChange}
                />
                <small>Max guests</small>
                <input
                  className="form-control py-4"
                  type="number"
                  name="maxGuests"
                  placeholder="max # of guests"
                  value={propertyEdit.maxGuests}
                  onChange={handleChange}
                />
                <small>Directions</small>
                <textarea
                  className="form-control py-4"
                  name="directions"
                  placeholder="directions"
                  value={propertyEdit.directions}
                  onChange={handleChange}
                />
                <small>Check in instructions</small>
                <textarea
                  className="form-control py-4"
                  name="checkinInstructions"
                  placeholder="checkin instructions"
                  value={propertyEdit.checkinInstructions}
                  onChange={handleChange}
                />
                <small>Wifi details</small>
                <textarea
                  className="form-control py-4"
                  name="wifiDetails"
                  placeholder="wifi info"
                  value={propertyEdit.wifiDetails}
                  onChange={handleChange}
                />
                <small>House manual</small>
                <input
                  className="form-control py-4"
                  name="houseManual"
                  placeholder="house manual link"
                  value={propertyEdit.houseManual}
                  onChange={handleChange}
                />
                <small>House rules</small>
                <textarea
                  className="form-control py-4"
                  name="houseRules"
                  placeholder="house rules"
                  value={propertyEdit.houseRules}
                  onChange={handleChange}
                />
                <small>Cancellation Policy</small>
                <textarea
                  className="form-control py-4"
                  name="cancellationPolicy"
                  placeholder="cancellation policy"
                  value={propertyEdit.cancellationPolicy}
                  onChange={handleChange}
                />
              </div>
              <button className="form-control btn btn-primary text-white ">
                Submit changes
              </button>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProperty;
