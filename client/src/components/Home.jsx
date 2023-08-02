import React from "react";
import { Link, useNavigate } from "react-router-dom";

let Home = () => {

  let navigate = useNavigate();
  let clickLogOut = async () => {
    localStorage.removeItem("devroom");
    navigate("/users/login");
  };

  return (
    <React.Fragment>
      <div className="landing-page">
        <div className="wrapper">
          <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
            <h5 className="display-4 animated zoomIn">Travel-Nex</h5>
            <p className="animated zoomIn">
              A website for travel enthusiasts where they book appointments with travel agents, and the travel agents can set their available time-slots for booking.
            </p>
            {localStorage.getItem("devroom") ? (
              <div className="animated jello">
                <Link
                  to="/users/register"
                  className="btn btn-danger btn-sm text-white me-5"
                  onClick={clickLogOut}
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="animated jello">
                <Link
                  to="/users/register"
                  className="btn btn-primary btn-sm text-white me-5"
                >
                  Register
                </Link>
                <Link to="/users/login" className="btn btn-success btn-sm">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
