import React, { useState, useEffect } from "react";
import { PhotoCameraOutlined, EditOutlined } from "@material-ui/icons";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {
  favouritesList,
  getAllFavourites,
  updateFavourites,
} from "../features/productsSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { Navigate } from "react-router-dom";

function profileDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [favProds, setFavProds] = useState([]);
  // const favProds = useSelector(getAllFavourites);
  const [numOfFav, setNumOfFav] = useState(0);

  useEffect(() => {
    getFavouriteItems();
  }, []);

  const getFavouriteItems = () => {
    Axios.get(
      "http://3.101.191.130:4001/api/products/getFavourites/" + user.id
    ).then((response) => {
      console.log(response);
      if (response.data.result) {
        console.log("geting all fav products and storing in redux");
        console.log(response.data.result.result);

        // response.data.result.map((favItem) => {
        //   console.log("Fav items");
        //   // console.log(favItem.itemId);
        //   //  setProducts([...products, ...response.data.result]);
        //   setFavProds([...favProdS, favItem.itemId]);
        // });

        setFavProds(response.data.result.result);
        dispatch(favouritesList(response.data.result.result));

        // console.log(response.data.result.length);
      }
    });
  };

  const editProfile = () => {
    navigate("/updateProfile");
  };

  const handleFavourite = (favId) => {
    console.log("Favourites deletd" + favId);
    Axios.delete(
      "http://3.101.191.130:4000/api/products/deleteFavourite/" + favId
    ).then((response) => {
      console.log(response.data);
      if (response.data.success === true) {
        console.log("item deleted successfully");
        console.log(response.data.res);
        window.location.pathname = "/profile";
      }
    });
  };

  let renderFavourites = null;
  if (favProds === null) {
    renderFavourites = () => {
      return <div>No Favourites added</div>;
    };
  } else {
    renderFavourites = favProds.map((pro) => {
      return (
        <div className="home_cards col-md-4 mb-4">
          <div className="home_card card">
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "5px",
              }}
              className="favourite_icon"
              onClick={() => {
                handleFavourite(pro._id);
              }}
            >
              <FavoriteBorderIcon />
            </div>
            <img
              src={pro.itemId["itemImage"]}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{pro.itemId["itemName"]}</h5>
              <h6>Price: ${pro.itemId["itemPrice"]}</h6>
              <p className="card-text">{pro.itemId["itemDescription"]}</p>
              {/* <button className="btn-sm btn-dark">Edit</button> */}
            </div>
          </div>
        </div>
      );
    });
  }

  let redirectVar = null;
  if (user === null || !cookie.load("user")) {
    console.log("cookie is found " + user);
    redirectVar = <Navigate to="/home" />;
  }
  return (
    <div>
      {redirectVar}
      {/* <h1>{favProdS}</h1> */}

      <div className="profile_dashboard">
        <img
          className="profile_image"
          src={user.profilePic}
          alt="profile pic"
        />

        <div className="profile_name">{cookie.load("user")}</div>
        <div className="edit_profileIcon">
          <span onClick={editProfile} className="edit_icon">
            <EditOutlined />
          </span>
        </div>

        <div className="profile_favourites">
          <h2 style={{ fontSize: "30px" }}>Favourites</h2>
          <div className="container-fluid mx-1">
            <div className="row mt-5 mx-1">
              <div className="col-md-9">
                <div className="row"> {renderFavourites} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profileDashboard;
