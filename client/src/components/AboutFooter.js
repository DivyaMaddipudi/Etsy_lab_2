import React from "react";
import "./NavBar.css";

function AboutFooter() {
  return (
    <div>
      <section class="etsy">
        <div class="content-area">
          <div class="etsy-title">
            <h2>What is Etsy</h2>
            <a href="#">Read our wonderfully weird story</a>
          </div>
          <div class="etsy-area">
            <div class="etsy-card">
              <h3>A one-of-a-kind community</h3>
              <p>
                Etsy is a global online marketplace, where people come together
                to make, sell, buy and collect unique items.
              </p>
            </div>
            <div class="etsy-card">
              <h3>Support independent creators</h3>
              <p>
                There’s no Etsy warehouse – just millions of people selling the
                things they love. We make the whole process easy, helping you
                connect directly with makers to find something extraordinary.
              </p>
            </div>
            <div class="etsy-card">
              <h3>Peace of mind</h3>
              <p>
                Your privacy is the highest priority of our dedicated team. And
                if you ever need assistance, we are always ready to step in for
                support.
              </p>
            </div>
          </div>
          <div class="etsy-footer">
            <h4>Have a question? Well, we’ve got some answers.</h4>
            <button class="btn">
              <a href="#">Go to Help Center</a>
            </button>
          </div>
        </div>
      </section>

      <section class="news">
        <div class="content-area">
          <h4>
            Yes! Send me exclusive offers, unique gift ideas, and personalized
            tips for shopping and selling on Etsy
          </h4>
          <div class="subscribe">
            <input type="text" placeholder="Enter your email" />
            <button
              className="subscribe_btn"
              style={{
                border: "none",
                borderRadius: "20px",
                fontSize: "18px",
                position: "relative",
                top: "0",
                left: "-6%",
                padding: "7px",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutFooter;
