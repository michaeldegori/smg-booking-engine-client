import React from 'react';
import ICalImport from './ICalImport';
import '../styles/EditProperty.css';

const WalkerVrboCal = (props) => {
  return (
    <div>
      <div className="container-xl ">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <h5 className="card-title py-2">Add Walker VRBO Calendar</h5>
            <form>
              <div className="form-group">
                <div className="form-group">
                  <small>Calendar</small>
                  <br />
                  {ICalImport('5fd916ae176b189363982d81', 'VRBO')}
                </div>
              </div>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkerVrboCal;
