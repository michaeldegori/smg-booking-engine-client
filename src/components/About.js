import React from 'react';
import '../styles/About.css';
import momAndI from '../images/mom-and-i.jpeg';
import michael from '../images/michael.png';

const About = () => {
  return (
    <section className="about">
      <div
        className="container-xl rounded"
        id="top"
        style={{
          backgroundImage: `url(${momAndI})`,
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 25%',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      >
        <div
          className="row d-flex justify-content-start align-items-center"
          style={{
            minHeight: '70vh',
          }}
        >
          <div className="col">
            <h1
              className="text-white text-center display-2"
              id="title"
              style={{
                marginTop: '25%',
                fontFamily: 'Rock Salt, cursive',
                lineHeight: '3.5rem',
              }}
            >
              About us
            </h1>
          </div>
        </div>
      </div>
      <div className="container-xl py-3 mt-4">
        <h3 className="mb-3">About your hosts</h3>
        <p>
          Debra and I (Michael) are a mother and son team living in sunny Miami,
          FL. Debra spent her younger years investing in properties throughout
          the Midwest. After meeting her husband (and my father), they teamed up
          for years managing and operating dozens of bars and restaurants across
          the US. They ranged from Minneapolis to New York City to Ft.
          Lauderdale and Las Vegas. After 20+ years of success, Debra decided to
          settle in as a full-time homemaker to raise her two youngest children.
          Growing up in Las Vegas, NV, I have always been drawn to music and
          technology. After going to school for music engineering and marketing,
          I worked in the nightlife industry in Chicago before ultimately moving
          to Miami. This led me to a career in the music industry, primarily as
          a disk jockey for venues in South Florida.
          <br />
          <br />
          Debra and I have both always shared a passion for nature and outdoor
          activities, especially those in the mountains. Debra having competed
          in triathlons, and me being an avid adventurer, we love to hike and
          ski and everything in between. With Debra’s youngest daughter (my
          sister, Joey) leaving for college soon and me looking for the next
          step in my professional career, the two of us decided we wanted to buy
          some properties in a place that excited us. We found the Smoky
          Mountains were the perfect place to be. The views and the people were
          spectacular, and we both instantly fell in love with the charm of the
          Gatlinburg/Pigeon Forge areas.
          <br />
          <br />
          We both have a love for animals and are avid travel enthusiasts. Even
          though we both have full-time schedules, just like you, we are
          available to answer any questions you may have during your stay. We
          want to make your trip as comfortable as possible.
          <br />
          <br />
          We are most accessible by message through Airbnb/VRBO during the day.
          Please do keep in mind that we are not a hotel and operate our cabins
          remotely through the help of our wonderful local team. We may not
          respond right away if we’re messaged outside of normal waking hours.
          We will do our best to accommodate any extra requests you may have,
          but are mostly limited from being hands on in person unless it’s an
          emergency. Thank you again for choosing to stay with us, and we look
          forward to hosting you in the Great Smoky Mountains!
          <br />
          <br />
          All the best,
        </p>
        <img src={michael} alt="" style={{ width: '15rem' }} />
      </div>
    </section>
  );
};

export default About;
