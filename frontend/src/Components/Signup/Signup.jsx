import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// project internal imports
import Loader from "../Shared/Loader";
import Model from "../Shared/Model";

import { signup } from "../../Features/User/userSlice";
const SignUp = () => {
  // useState Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [reTpyePassword, setReTypePassword] = useState("");
  const [show, setShow] = useState(false);
  // const [error, setError] = useState("");
  let navigation = useNavigate();

  // redux

  const dispatch = useDispatch();
  const { isLoading, message, error } = useSelector((store) => store.user);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (message === "Signed up Successfully") {
      navigation("/login");
    }
  }, [message]);

  useEffect(() => {
    console.log(error);
  }, [error]);
  const closeModel = () => {
    setShow(false);
  };

  // image uplading handler
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

  // signup form handler function
  const hanldeSubmit = async (e) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);
    formData.append("password", password);
    e.preventDefault();
    if (!name) {
      return toast.error("Name is required");
    } else if (!email) {
      return toast.error("Email is required");
    } else if (!password) {
      return toast.error("Password field required ");
    } else if (!image) {
      return toast.error("Please select an image");
    } else if (password !== reTpyePassword) {
      return toast.error("Password is not same ");
    }

    dispatch(signup(formData));
  };

  return (
    <div className="container-scroller mt-4">
      <div className="container-fluid">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            {image && <Model show={show} image={image} onHide={closeModel} />}
            <div className="col-lg-4 mx-auto ">
              <div className="auth-form-light  text-left py-5 px-4 px-sm-5 card shadow">
                <h3 className="text-center">Sign Up</h3>
                {error && <div className="alert alert-danger">{error}</div>}
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
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword2"
                      placeholder="Re-Type Password"
                      value={reTpyePassword}
                      onChange={(e) => {
                        setReTypePassword(e.target.value);
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
                        SIGN UP
                      </button>
                    )}
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account?{" "}
                    <Link to="/login" className="text-decoration-none">
                      <span className="text-danger ">Login</span>
                    </Link>
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

export default SignUp;
