import React from "react";
import Sidebar from "../components/sidebar";

const page = () => {
  return (
    <div className="row sections">
      <Sidebar />
      <div className="col-xl-9 col-md-12">
        <div className="gx-block" id="introduction">
          <div className="gx-card gx-page-block">
            <div className="gx-card-content max-height-data ">
              <div className="intero centeral">
                <p className="client-sent">Thank you</p>
                <p className="popins-data-helpex mt-1">
                  Thank you again for download 'TalkRight', enjoy it and give us
                  your valuable Review & Rating.
                </p>
                <img
                  src="assets/image/review/Review.gif"
                  alt="review"
                  className="img-fluid review-sent"
                />
                <div className="review-button">
                  <a
                    href="#"
                    target="_blank"
                    className="button-buy date-button"
                  >
                    Rate This Item
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    className="button-buy date-button"
                  >
                    Follow Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
