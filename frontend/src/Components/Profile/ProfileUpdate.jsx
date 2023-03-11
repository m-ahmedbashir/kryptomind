import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// project internal imports
import Model from "../Shared/Model";
import Loader from "../Shared/Loader";
import { updateProfile } from "../../Features/User/userSlice";

const ProfileUpdate = () => {
  // State Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [show, setShow] = useState(false);

  // redux
  const dispatch = useDispatch();
  const { profile, isLoading, message, token } = useSelector(
    (store) => store.user
  );

  // message notifications
  useEffect(() => {
    if (message === "Logged In" || message === "Signed up Successfully") {
      return;
    }
    if (message === "User Profile updated successfully") {
      toast.success(`${message}. Please Login Again`);
    } else {
      toast.error(message);
    }
  }, [message]);

  // preview model
  const closeModel = () => {
    setShow(false);
  };

  // handle Image upload
  const handleImageUpload = (event) => {
    if (event.target.files[0] && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  };

  // handle image preview

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    setShow(true);
  }, [file]);

  // updating profile
  const hanldeSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", profile.userId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);
    formData.append("password", password);
    formData.append("token", token);
    dispatch(updateProfile({ postData: formData, token: token }));
  };

  return (
    <div className="container-scroller mt-4">
      <div className="container-fluid">
        <div className="content-wrapper d-flex px-0">
          <div className="row w-100 mx-0">
            {image && <Model show={show} image={image} onHide={closeModel} />}
            <div className="mx-auto ">
              <div className="auth-form-light  text-left py-5 px-4 px-sm-5 card shadow">
                <h3 className="text-center">Update Profile</h3>
                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleInputUsername1"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      id="profileImage"
                      placeholder="Profile Image"
                      onChange={handleImageUpload}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Update Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mt-3 text-center">
                    {isLoading ? (
                      <Loader size={25} />
                    ) : (
                      <button
                        className="btn btn-outline-danger "
                        onClick={hanldeSubmit}
                      >
                        Update Profile
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
