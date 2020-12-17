import React, { useState, useEffect } from 'react';
import '../styles/PropertyDetails.css';
import Axios from 'axios';
import { DateRangePicker } from 'react-dates';
import '../styles/EasyDateRange.css';
import moment from 'moment';
moment().format();

const EasyDateRange = (props) => {
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState();
  const [dateRange, setdateRange] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_BACKEND}get-bookings/5fd8cdc6ed2ea14c3a06f712`
    )
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.log(err));
  });

  const [focus, setFocus] = useState(null);

  const { startDate, endDate } = dateRange;

  const handleDateChange = (dates) => {
    setdateRange({ startDate: dates.startDate, endDate: dates.endDate });
  };

  const today = new Date();
  const todaysDate =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const oneYearOut = new Date();
  oneYearOut.setFullYear(oneYearOut.getFullYear() + 1);

  const getDatesArr = (start) => {
    let arr = [];
    for (
      let date = new Date(start);
      date < oneYearOut;
      date.setDate(date.getDate() + 1)
    ) {
      arr.push(new Date(date));
    }
    return arr;
  };

  const availableDates = getDatesArr(todaysDate);

  const showController = () => {
    setOpen(!open);
  };

  // const values = iCal.map(function (date) {
  //   return date.getTime();
  // });
  // const unique = availableDates.filter(function (date) {
  //   return values.indexof(date.getTime()) == -1;
  // });

  return (
    <div>
      <h6 className="card-title text-primary mt-2">Check Availability</h6>
      <DateRangePicker
        startDatePlaceholderText="Start"
        startDate={startDate}
        onDatesChange={handleDateChange}
        endDatePlaceholderText="End"
        endDate={endDate}
        numberOfMonths={1}
        displayFormat="MMM DD"
        showClearDates={true}
        focusedInput={focus}
        onFocusChange={(focus) => setFocus(focus)}
        startDateId="start-date"
        endDateId="end-date"
        minimumNights={3}
        hideKeyboardShortcutsPanel={true}
        anchorDirection="right"
        autoFocus
        openDirection="up"
        block
        isDayBlocked={(day) =>
          !availableDates.some((date) => day.isSame(date, 'day'))
        }
      />
      <div className="m-3"></div>
    </div>
  );
};

export default EasyDateRange;
