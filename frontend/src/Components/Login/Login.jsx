import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

// internal file imports
import Loader from "../Shared/Loader";
import { login } from "../../Features/User/userSlice";

const Login = () => {
  // useState Hooks

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  // redux
  const dispatch = useDispatch();
  const { isLoading, message, error } = useSelector((store) => store.user);

  useEffect(() => {
    if (message === "Logged In") {
      navigation("/dashboard");
    }
  }, [message]);

  // handle login
  const hanldeSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (email && password) {
      dispatch(login(formData));
    } else {
      toast.error("Email or password field is empty ");
    }
  };
  return (
    <div>
      <div className="container-scroller mt-5">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto card shadow">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <h2 className="text-center">Login</h2>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form className="pt-3">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="exampleInputEmail1"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group mt-3 pt-1">
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
                    <div className="mt-3 text-center">
                      {isLoading ? (
                        <Loader loading={isLoading} size={25} />
                      ) : (
                        <button
                          className="btn btn-outline-danger "
                          onClick={hanldeSubmit}
                        >
                          LOG IN
                        </button>
                      )}
                    </div>

                    <div className="text-center mt-4 font-weight-light">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-decoration-none">
                        <span className="text-danger ">Sign Up</span>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
