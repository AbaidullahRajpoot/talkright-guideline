import React from "react";
import Sidebar from "../components/sidebar";

const page = () => {
  return (
    <div className="row sections">
      <Sidebar />
      <div class="col-xl-9 col-md-12">
        <div class="gx-block" id="introduction">
          <div class="gx-card gx-page-block">
            <div class="gx-card-content max-height-data ">
              <div class="intero centeral">
                <p class="client-sent">Thank you</p>
                <p class="popins-data-helpex mt-1">
                  Thank you again for download 'TalkRight', enjoy it and give us
                  your valuable Review & Rating.
                </p>
                <img
                  src="assets/image/review/Review.gif"
                  alt="review"
                  class="img-fluid review-sent"
                />
                <div class="review-button">
                  <a href="#" target="_blank" class="button-buy date-button">
                    Rate This Item
                  </a>
                  <a href="#" target="_blank" class="button-buy date-button">
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
