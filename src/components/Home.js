import React, { useState, Component } from 'react';
import '../styles/Home.css';
import walkerLiving from '../images/walker-living.jpeg';
import easyPorch from '../images/easy-porch.jpeg';
import walkerView from '../images/walker-view.webp';
import background from '../images/smoky-background.jpg';
import cabinGlyph from '../images/cabin-glyph.png';
import heartGlyph from '../images/heart-glyph.png';
import serviceGlyph from '../images/service-glyph.png';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
moment().format();

const Home = (props) => {
  const [dateRange, setdateRange] = useState({
    startDate: '',
    endDate: '',
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

  return (
    <section className="home">
      <div
        className="container-xl rounded"
        id="top"
        style={{
          backgroundImage: `url(${background})`,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          height: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50%',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      >
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{
            minHeight: '35vh',
          }}
        >
          <div className="col-md-6">
            <h1
              className="text-white text-center mt-5"
              id="title"
              style={{
                fontFamily: 'Rock Salt, cursive',
                lineHeight: '3.5rem',
              }}
            >
              Smoky Mountain
              <br />
              Getaways
            </h1>
          </div>
          <div className="col-md-6">
            <div className="card my-4">
              <div className="card-body">
                <h5 className="card-title">
                  Your perfect getaway is waiting for you
                </h5>
                <form id="date-picker">
                  <div className="form-group">
                    <label className="mb-1">When will you be joining us?</label>
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
                      autoFocus={focus}
                      withPortal
                      block
                      isDayBlocked={(day) =>
                        !availableDates.some((date) => day.isSame(date, 'day'))
                      }
                    />
                    <div className="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="mt-2 mb-1"
                      >
                        Total Guests
                      </label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                      </select>
                    </div>
                    <button
                      className="btn btn-primary text-white"
                      style={{ width: '100%' }}
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xl py-3 mt-4">
        <h3 className="">What our guests have to say about us</h3>
        <div className="row mt-4">
          <div className="col-md-4 d-flex align-items-stretch">
            <div className="card mb-3">
              <img
                src={walkerLiving}
                className="card-img-top"
                style={{
                  height: '15rem',
                  objectFit: 'cover',
                }}
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title text-danger">
                  &#9733; &#9733; &#9733; &#9733; &#9733;
                </h5>
                <p className="card-text">
                  "Awesome! Amazing! Beautiful! I cannot say enough about this
                  cabin and our long weekend in the mountains. This cabin had
                  anything and everything that we needed. It was immaculate and
                  smelled so good when we walked inside. We loved it and the
                  plus was that it's close to everything that you need or want.
                  We made a couple of trips to the Pigeon Forge Island, which by
                  the way, was AMAZING!!! I would definitely recommend this
                  cabin and my whole family agreed this will be a family
                  tradition. Great hosts also."
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    - Paulette, Walker's Retreat
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-stretch">
            <div className="card mb-3">
              <img
                src={easyPorch}
                className="card-img-top"
                style={{
                  height: '15rem',
                  objectFit: 'cover',
                }}
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title text-danger">
                  &#9733; &#9733; &#9733; &#9733; &#9733;
                </h5>
                <p className="card-text">
                  "We really enjoyed our stay, Michael is very responsive and
                  helped us immediately for whatever we asked. Cabin has lot of
                  amenities and location is one of the best. It has lot of space
                  for recreational activities and stunning view from all the
                  sides. It's very clean and exactly as shown in the pics. We
                  will definitely book other properties offered by Michael and
                  will book this whenever we visit Smokey mountain again."
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    -Chhayank, Easy's Retreat
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-stretch">
            <div className="card mb-3">
              <img
                src={walkerView}
                className="card-img-top"
                style={{
                  height: '15rem',
                  objectFit: 'cover',
                }}
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title text-danger">
                  &#9733; &#9733; &#9733; &#9733; &#9733;
                </h5>
                <p className="card-text">
                  "This was a great place to stay. A short drive to
                  entertainment, food, entertainment, and of course, the
                  National Park. We really enjoyed the option of eating
                  breakfast and dinner here and saving a few extra dollars for
                  entertainment. You could just stay on the deck and enjoy the
                  privacy and beautiful views but you should definitely visit
                  the parks and some of the local distilleries... in that order.
                  The rooms were clean, comfortable, and was nicely decorated to
                  give it a cabin-like feel. This was great for a couple's
                  get-away and also had a nice collection of games for family
                  time. The hot tub and gas grill were nice touches. When we
                  come back to this area we will certainly stay here again.
                  Thanks Michael and Debra!""
                </p>
                <p className="card-text">
                  <small className="text-muted">-Scott, Walker's Retreat</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xl">
        <hr />
        <h3 className="text-dark">Traveling with Smoky Mountain Getaways</h3>
        <div className="row mt-4">
          <div className="col-md-4 d-flex align-items-stretch">
            <div className="card mb-3">
              <div className="card-body">
                <img
                  src={heartGlyph}
                  style={{ width: '3rem', height: 'auto' }}
                  alt=""
                />
                <div className="card-body pl-0">
                  <h5 className="card-title text-danger">Always serving you</h5>
                  <p className="card-text">
                    We’re here for <strong>you</strong>. Our hope is that you'll
                    feel like you're a guest in our own home. We'll always go
                    out of our way to make your stay as <i>memorable</i> as
                    possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-stretch">
            <div className="card mb-3 ">
              <div className="card-body">
                <img
                  src={cabinGlyph}
                  style={{ width: '2.9rem', height: 'auto' }}
                  alt=""
                />
                <div className="card-body pl-0">
                  <h5 className="card-title text-danger">
                    Decades of hospitality
                  </h5>
                  <p className="card-text">
                    We have half a century in combined hospitality experience.
                    Our standards of cleaning and service are based on years of{' '}
                    <strong>hard-work</strong> and <strong>dedication</strong>{' '}
                    to the craft.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-stretch">
            <div className="card mb-3 ">
              <div className="card-body">
                <img
                  src={serviceGlyph}
                  style={{ width: '3.1rem', height: 'auto' }}
                  alt=""
                />
                <div className="card-body pl-0">
                  <h5 className="card-title text-danger">5-star hosts</h5>
                  <p className="card-text">
                    We have a 4.9+ star lifetime rating on Airbnb, VRBO and
                    HomeAway. The way we see it, 5-star service should be our
                    baseline. We strive to give just that <i>little bit</i>{' '}
                    extra to make your time completely <strong>magical.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-12 pl-0 mb-3">
              <h2 className="h3  mt-0 mb-2">When are you traveling?</h2>
              <p className="mt-0 ml-0 mb-2">
                Add dates for updated pricing and availability.
              </p>
              <a href="#top">
                <button className="btn btn-primary text-white">
                  Add dates
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
