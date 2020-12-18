import React from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';
import '../styles/EditProperty.css';
import ICAL from 'ical.js';
import mongoose from 'mongoose';

const ICalImport = (propertyId, source) => {
  const history = useHistory();

  const readFile = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
      let contents = event.target.result;
      let parsedContents = ICAL.parse(contents);
      let bookingData = parsedContents[2].map((eachEvent) =>
        eachEvent[1].map((item) => item)
      );
      let bookingDates = bookingData.map((items) => {
        let checkinDetail = items[1];
        let checkoutDetail = items[0];
        return {
          checkinDate: new Date(checkinDetail[3]),
          checkoutDate: new Date(checkoutDetail[3]),
        };
      });

      bookingDates.map((eachBooking) => {
        api
          .post(
            `${process.env.REACT_APP_BACKEND}properties/${propertyId}/reserve`,
            {
              property: mongoose.Types.ObjectId(`${propertyId}`),
              ...eachBooking,
              bookingSource: `${source}`,
            }
          )
          .then((res) => {
            history.push('/');
            console.log('Calendar Uploaded Successfully');
          })
          .catch((err) => {
            alert('Upload Error');
          });
      });
    };
    reader.readAsText(file);
  };

  // const values = iCal.map(function (date) {
  //   return date.getTime();
  // });
  // const unique = availableDates.filter(function (date) {
  //   return values.indexof(date.getTime()) == -1;
  // });

  return (
    <div>
      <input type="file" onChange={readFile} />
    </div>
  );
};

export default ICalImport;
