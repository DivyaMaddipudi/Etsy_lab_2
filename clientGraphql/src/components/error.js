import React from "react";
import Hoverbar from "./Hoverbar";
import Navbar from "./Navbar";

function profileForm() {
  return (
    <div>
      <Navbar />
      <Hoverbar />
      <hr />
      <div className="update_profile_page">
        <div className="edit_icons">
          <ul>
            <li>Purchases and Reviews</li>
            <li>Public Profile</li>
            <li>Settings</li>
            <li>Apps</li>
            <li>Prototypes</li>
            <li>Sign Out</li>
          </ul>
        </div>
        <div className="profile_bio">
          <div>Changes saved successfully</div>
          <div className="profile_page_header">
            <b>Your public profile</b>
            <button className="view_profile">View Profile</button>
          </div>
          <p>Everything on this page can be seen by anyone</p>
          <form className="edit_profile">
            <table className="profile_table">
              <table>
                <tr className="profile_row">
                  <td>Profile Picture</td>
                  <td>
                    <input type="file"></input>
                  </td>
                </tr>
                <tr>
                  <td>Profile Name</td>
                  <td>Divya Maddipudi</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>
                    <input type="radio" />
                    <label> Female</label>
                    <input type="radio" />
                    <label> Male</label>
                    <input type="radio" />
                    <label> Rather not say</label>
                    <input type="radio" />
                    <label> Custom</label>
                  </td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>
                    <input type="text"></input>{" "}
                  </td>
                </tr>
                <tr>
                  <td>Birthday</td>
                  <td>
                    <input type="date"></input>{" "}
                  </td>
                </tr>
                <tr>
                  <td>About</td>
                  <td>
                    <textarea />
                  </td>
                </tr>
                <tr>
                  <td>Favourite Materials</td>
                  <td>
                    <textarea />
                  </td>
                </tr>
                <tr>
                  <td>Include on your profile</td>
                  <td>
                    <input type="checkbox" id="shop" name="shop" value="Shop" />
                    <label for="shop">Shop</label>
                    <br />
                    <input
                      type="checkbox"
                      id="Favourite_items"
                      name="Favourite_items"
                      value="Favourite_items"
                    />
                    <label for="Favourite_items">Favourite items</label>
                    <br />
                    <input
                      type="checkbox"
                      id="Favourite_shops"
                      name="Favourite_shops"
                      value="Favourite_shops"
                    />
                    <label for="Favourite_shops"> Favourite Shops</label>
                  </td>
                </tr>
              </table>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default profileForm;
