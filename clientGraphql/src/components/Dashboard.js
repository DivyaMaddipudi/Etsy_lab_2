import React from "react";
import cookie from "react-cookies";

function Dashboard() {
  return (
    <div>
      <div className="dash_board">
        <h1 className="title">
          {cookie.load("user")
            ? `Welcome to Etsy, ${cookie.load("user")}!`
            : "Explore one-of-a-kind finds from independent makers"}
        </h1>
        <div className="dashboard_items">
          <div className="dashboard_item">
            <img
              className="dashboard_image"
              src="https://images.pexels.com/photos/1129413/pexels-photo-1129413.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="home"
            ></img>
            <h3 style={{ marginTop: "10px", fontSize: "20px" }}>Home Decor</h3>
          </div>
          <div className="dashboard_item">
            <img
              className="dashboard_image"
              src="https://images.pexels.com/photos/2013782/pexels-photo-2013782.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="home"
            ></img>
            <h3
              style={{
                marginTop: "10px",
                fontSize: "20px",
                marginLeft: "-10%",
              }}
            >
              Outdoor & Garden
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              className="dashboard_image"
              src="https://images.pexels.com/photos/6434620/pexels-photo-6434620.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="home"
            ></img>
            <h3
              style={{
                marginTop: "10px",
                fontSize: "20px",
                marginLeft: "-10%",
              }}
            >
              Kitchen & Dining
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              className="dashboard_image"
              src="https://images.pexels.com/photos/3981763/pexels-photo-3981763.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="home"
            ></img>
            <h3
              style={{ marginTop: "10px", fontSize: "20px", marginLeft: "1%" }}
            >
              Accessories
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              className="dashboard_image"
              src="https://images.pexels.com/photos/169203/pexels-photo-169203.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="home"
            ></img>
            <h3
              style={{
                marginTop: "10px",
                fontSize: "20px",
                marginLeft: "-10%",
              }}
            >
              Wedding Decor
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              className="dashboard_image"
              src="https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="home"
            ></img>
            <h3
              style={{
                marginTop: "10px",
                fontSize: "20px",
                marginLeft: "15%",
              }}
            >
              Gadgets
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
