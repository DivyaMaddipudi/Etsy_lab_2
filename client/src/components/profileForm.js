import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import "./profileForm.css";
import logo from "./etsyFooter.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserDetails } from "../features/userSlice";
import Axios from "axios";
import axios from "axios";
import cookie from "react-cookies";
import { Navigate } from "react-router-dom";

function profileForm() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [dob, setDob] = useState("");
  const [about, setAbout] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleUserData = (e) => {
    e.preventDefault();
    // console.log("In profile form");
    // console.log(userImage);

    // console.log("User data submitted successfully");
    // console.log(userImage);
    // console.log(userName);
    // console.log(gender);
    // console.log(city);
    // console.log(dob);
    // console.log(about);
    const formData = new FormData();
    formData.append("userImage", userImage);
    formData.append("userName", userName);
    formData.append("gender", gender);
    formData.append("city", city);
    formData.append("fullAddress", fullAddress);
    formData.append("dob", dob);
    formData.append("about", about);
    formData.append("phoneNumber", phoneNumber);
    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("token");
    Axios.put(
      "http://3.101.191.130:4001/api/users/updateUser/" + user.id,
      formData
    ).then((response) => {
      console.log("In update");

      console.log(response.data.results.userObj);
      console.log(response.data.results.userObj["phoneNumber"]);

      if (response.data.results) {
        console.log("Image uploaded successfully");
        console.log(fullAddress);
        // console.log(response.data.result);
        setUserName(response.data.results.userObj["userName"]);
        setDob(response.data.results.userObj["dob"]);
        setGender(response.data.results.userObj["gender"]);
        setCity(response.data.results.userObj["city"]);
        setFullAddress(fullAddress);
        setUserImage(response.data.results.userObj["profilePic"]);
        setAbout(about);
        setPhoneNumber(response.data.results.userObj["phoneNumber"]);

        dispatch(
          updateUserDetails({
            name: response.data.results.userObj["userName"],
            dob: response.data.results.userObj["dob"],
            gender: response.data.results.userObj["gender"],
            city: response.data.results.userObj["city"],
            fullAddress: fullAddress,
            profilePic: response.data.results.userObj["profilePic"],
            about: about,
            phoneNumber: response.data.results.userObj["phoneNumber"],
          })
        );
        window.location.pathname = "/profileForm";
      }
    });
  };

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = (e) => {
    // e.preventDefault();
    // axios.defaults.headers.common["authorization"] =
    //   localStorage.getItem("token");
    Axios.get(
      "http://3.101.191.130:4000/api/users/getShopById/" + user.id
    ).then((response) => {
      console.log(response);

      // console.log("In get of profile form");
      if (response.data.success === true) {
        console.log("In get of profile form");
        console.log(response.data.user);
        console.log(response.data.user["fullAddress"]);

        setUserName(response.data.user["username"]);
        setUserImage(response.data.user["profilePic"]);
        setDob(response.data.user["dob"]);
        setGender(response.data.user["gender"]);
        setCity(response.data.user["city"]);
        setFullAddress(response.data.user["fullAddress"]);
        setAbout(response.data.user["about"]);
        setPhoneNumber(response.data.user["phoneNumber"]);
        console.log("Products stored in product");
      }
    });
  };

  const dateFunction = (specifiedDate) => {
    if (specifiedDate === "null") {
      return new Date();
    } else {
      return new Date(specifiedDate).toISOString().split("T")[0];
    }
  };

  // useEffect(() => {
  //   fetchItemDetails();
  // }, []);

  // const fetchItemDetails = () => {
  //   Axios.get("http://3.101.191.130:4000/getShopById/" + user.id).then(
  //     (response) => {
  //       if (response) {
  //         console.log(response.data.result[0].shopImage);
  //         setShopImage(response.data.result[0].shopImage);
  //         // setProductExist(true);
  //         console.log("Products stored in get shop by id");
  //       }
  //     }
  //   );
  // };

  let redirectVar = null;
  if (user === null || !cookie.load("user")) {
    console.log("cookie is found " + user);
    redirectVar = <Navigate to="/home" />;
  }
  return (
    <div>
      {redirectVar}
      <Navbar />
      <Hoverbar />
      <hr></hr>

      <div className="user_form">
        <div className="user_icons">
          <ul className="user_icon">
            <li>Purchases & Reviews</li>
            <li>Public Profile</li>
            <li>Settings</li>
            <li>Apps</li>
            <li>Sign out</li>
          </ul>
        </div>

        <div className="user_edit_form">
          <div className="user-profile-edit">
            <div className="header-section">
              <div className="title">
                <h3 style={{ marginLeft: "-64%" }}>Your Public Profile</h3>
                <p style={{ fontSize: "30px" }}>
                  Everything on this page can be seen by anyone
                </p>
              </div>
            </div>

            <form encType="multipart/form-data">
              <div className="section">
                <div className="label">Profile Picture</div>
                <div className="profile-pic">
                  <img
                    style={{
                      // backgroundColor: "red",
                      width: "170px",
                      height: "145px",
                      borderRadius: "100%",
                    }}
                    width="200px"
                    src={userImage}
                    alt="shop"
                  ></img>
                </div>

                <input
                  type="file"
                  name="userImage"
                  id="profile-picture"
                  onChange={(event) => {
                    setUserImage(event.target.files[0]);
                  }}
                  style={{ marginLeft: "40px" }}
                />
                {/* <button className="normal-button">Remove picture</button> */}
              </div>

              <div className="section">
                <div className="label">Your Name</div>
                <input
                  defaultValue={userName}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                  type="text"
                  id="name"
                />
              </div>

              <div className="section">
                <div className="label">Phone Number</div>
                <input
                  defaultValue={phoneNumber}
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                  }}
                  type="number"
                  id="number"
                />
              </div>

              <div className="section">
                <div className="label">Gender</div>

                <div
                  style={{
                    display: "flex",
                  }}
                  className="gender"
                >
                  <div>
                    <input
                      checked={gender === "female"}
                      type="radio"
                      value="female"
                      name="gender"
                      onChange={(event) => {
                        setGender(event.target.value);
                      }}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <div>
                    <input
                      checked={gender === "male"}
                      type="radio"
                      value="male"
                      name="gender"
                      onChange={(event) => {
                        setGender(event.target.value);
                      }}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div>
                    <input
                      checked={gender === "other"}
                      type="radio"
                      value="other"
                      name="gender"
                      onChange={(event) => {
                        setGender(event.target.value);
                      }}
                    />
                    <label htmlFor="other">Other</label>
                  </div>
                </div>
              </div>

              <div className="section">
                <div className="label">Birthday</div>

                <input
                  defaultValue={dob}
                  type="date"
                  style={{ marginLeft: "-2%" }}
                  onChange={(event) => {
                    setDob(event.target.value);
                  }}
                />
              </div>

              <div className="section">
                <div for="country" className="label">
                  City
                </div>
                <select
                  id="country"
                  name="country"
                  class="form-control"
                  style={{ marginLeft: "2%" }}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                >
                  <option value="selected" selected>
                    {city}
                  </option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Åland Islands">Åland Islands</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="American Samoa">American Samoa</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Antigua and Barbuda">
                    Antigua and Barbuda
                  </option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermuda">Bermuda</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia and Herzegovina">
                    Bosnia and Herzegovina
                  </option>
                  <option value="Botswana">Botswana</option>
                  <option value="Bouvet Island">Bouvet Island</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British Indian Ocean Territory">
                    British Indian Ocean Territory
                  </option>
                  <option value="Brunei Darussalam">Brunei Darussalam</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Central African Republic">
                    Central African Republic
                  </option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Christmas Island">Christmas Island</option>
                  <option value="Cocos (Keeling) Islands">
                    Cocos (Keeling) Islands
                  </option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo</option>
                  <option value="Congo, The Democratic Republic of The">
                    Congo, The Democratic Republic of The
                  </option>
                  <option value="Cook Islands">Cook Islands</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cote D'ivoire">Cote D'ivoire</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Falkland Islands (Malvinas)">
                    Falkland Islands (Malvinas)
                  </option>
                  <option value="Faroe Islands">Faroe Islands</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="French Guiana">French Guiana</option>
                  <option value="French Polynesia">French Polynesia</option>
                  <option value="French Southern Territories">
                    French Southern Territories
                  </option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Greece">Greece</option>
                  <option value="Greenland">Greenland</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guadeloupe">Guadeloupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guernsey">Guernsey</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-bissau">Guinea-bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Heard Island and Mcdonald Islands">
                    Heard Island and Mcdonald Islands
                  </option>
                  <option value="Holy See (Vatican City State)">
                    Holy See (Vatican City State)
                  </option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran, Islamic Republic of">
                    Iran, Islamic Republic of
                  </option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Isle of Man">Isle of Man</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jersey">Jersey</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Korea, Democratic People's Republic of">
                    Korea, Democratic People's Republic of
                  </option>
                  <option value="Korea, Republic of">Korea, Republic of</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Lao People's Democratic Republic">
                    Lao People's Democratic Republic
                  </option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libyan Arab Jamahiriya">
                    Libyan Arab Jamahiriya
                  </option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macao">Macao</option>
                  <option value="Macedonia, The Former Yugoslav Republic of">
                    Macedonia, The Former Yugoslav Republic of
                  </option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia, Federated States of">
                    Micronesia, Federated States of
                  </option>
                  <option value="Moldova, Republic of">
                    Moldova, Republic of
                  </option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Netherlands Antilles">
                    Netherlands Antilles
                  </option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norfolk Island">Norfolk Island</option>
                  <option value="Northern Mariana Islands">
                    Northern Mariana Islands
                  </option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Palestinian Territory, Occupied">
                    Palestinian Territory, Occupied
                  </option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Pitcairn">Pitcairn</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Reunion">Reunion</option>
                  <option value="Romania">Romania</option>
                  <option value="Russian Federation">Russian Federation</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Helena">Saint Helena</option>
                  <option value="Saint Kitts and Nevis">
                    Saint Kitts and Nevis
                  </option>
                  <option value="Saint Lucia">Saint Lucia</option>
                  <option value="Saint Pierre and Miquelon">
                    Saint Pierre and Miquelon
                  </option>
                  <option value="Saint Vincent and The Grenadines">
                    Saint Vincent and The Grenadines
                  </option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">
                    Sao Tome and Principe
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Georgia and The South Sandwich Islands">
                    South Georgia and The South Sandwich Islands
                  </option>
                  <option value="Spain">Spain</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Svalbard and Jan Mayen">
                    Svalbard and Jan Mayen
                  </option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syrian Arab Republic">
                    Syrian Arab Republic
                  </option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania, United Republic of">
                    Tanzania, United Republic of
                  </option>
                  <option value="Thailand">Thailand</option>
                  <option value="Timor-leste">Timor-leste</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">
                    Trinidad and Tobago
                  </option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Turks and Caicos Islands">
                    Turks and Caicos Islands
                  </option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="United States Minor Outlying Islands">
                    United States Minor Outlying Islands
                  </option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Viet Nam">Viet Nam</option>
                  <option value="Virgin Islands, British">
                    Virgin Islands, British
                  </option>
                  <option value="Virgin Islands, U.S.">
                    Virgin Islands, U.S.
                  </option>
                  <option value="Wallis and Futuna">Wallis and Futuna</option>
                  <option value="Western Sahara">Western Sahara</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>

              <div className="section">
                <div className="label">
                  Full Address(Street Address and Apt No.)
                </div>
                <input
                  defaultValue={fullAddress}
                  type="text"
                  style={{ marginLeft: "-2%" }}
                  onChange={(event) => {
                    setFullAddress(event.target.value);
                  }}
                />
              </div>

              <div className="section">
                <div className="label">
                  Zipcode
                  {/* <p>Tell people a little about yourself.</p> */}
                </div>
                <input
                  type="text"
                  defaultValue={about}
                  style={{
                    marginLeft: "-3%",
                    borderRadius: "4px",
                    padding: "10px",
                    border: "1px solid #dcdcdc",
                  }}
                  id="about"
                  cols="30"
                  rows="10"
                  onChange={(event) => {
                    setAbout(event.target.value);
                  }}
                />
              </div>

              <button
                style={{ width: "30%", marginLeft: "50%" }}
                className="clicky"
                onClick={handleUserData}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profileForm;
