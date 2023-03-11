import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileUpdate from "../Profile/ProfileUpdate";
import { logout } from "../../Features/User/userSlice";
import { toast } from "react-toastify";
// import Address from "./Address/Address";
// import Profile from "./Profile/Profile";

const Dashboard = () => {
  const [active, setActive] = useState(0);
  const { profile } = useSelector((store) => store.user);

  //redux
  const dispatch = useDispatch();

  useEffect(() => {}, [profile]);
  // logout handler

  const logOutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    toast.success("Logged Out");
  };
  const handleActive = (stageId) => {
    setActive(stageId);
  };
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-4 col-12 mt-4 ">
            <div className="card mt-3 shadow ">
              <div className="card-header bg-white border-0">
                <div className="mt-2 text-center">
                  <img
                    src={`${profile?.image.url || "No image"}`}
                    alt="User "
                    className=" img-fluid rounded-2 w-25"
                  />
                </div>
              </div>
              <div className="card-body text-center">
                <p className="m-0">{profile?.name || "Name"}</p>
                <p className="m-0">{profile?.email || "email"}</p>
              </div>
              <div className="card-footer bg-white border-0 text-center ">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleActive(1)}
                >
                  Profile Setting
                </button>
                <br />
                <div>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={logOutHandler}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 g-0 col-12">
            <div className="row">
              <div className="col-12">
                {active === 1 && (
                  <div className="p-3">
                    <ProfileUpdate />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
