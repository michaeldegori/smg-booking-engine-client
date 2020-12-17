import React from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';
import '../styles/EditProperty.css';
import ICAL from 'ical.js';

const EasyVrboCal = (props) => {
  const history = useHistory();

  const iCalImport = () => {
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
          let checkinDetail = items[0];
          let checkoutDetail = items[1];
          return {
            checkinDate: new Date(checkinDetail[3]),
            checkoutDate: new Date(checkoutDetail[3]),
          };
        });

        bookingDates.map((eachBooking) => {
          api
            .post(
              `${process.env.REACT_APP_BACKEND}properties/5fd8cdc6ed2ea14c3a06f712/reserve`,
              {
                property: props.match.params.id,
                ...eachBooking,
                type: 'VRBO',
              }
            )
            .then((res) => {
              history.push('/');
              console.log('Calendar Uploaded Successfully');
            })
            .catch((err) => {
              alert('Upload Error');
            });

          // parse it with icalc and get all the dates out
          // create the bookings by sending the dates to an endpoint with Axios
        });
      };
      reader.readAsText(file);
    };
    return <input type="file" onChange={readFile} />;
  };

  // const values = iCal.map(function (date) {
  //   return date.getTime();
  // });
  // const unique = availableDates.filter(function (date) {
  //   return values.indexof(date.getTime()) == -1;
  // });

  return (
    <section className="add-property">
      <div className="container-xl ">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <h5 className="card-title py-2">Add Easy VRBO Calendar</h5>
            <form>
              <div className="form-group">
                <div className="form-group">
                  <small>Calendar</small>
                  <br />
                  {iCalImport()}
                </div>
              </div>
              <button className="form-control btn btn-primary text-white ">
                Submit calendar
              </button>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EasyVrboCal;
