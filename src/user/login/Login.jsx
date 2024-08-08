import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import app from "../../firebase/firebase.config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { userLogin } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef(null);
  const auth = getAuth(app);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    setLoginError("");
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        token(email);
        toast.success("User Login successfully");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  // reset password
  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("please write a valid email");
      return;
    }
    // send validation email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("please check your email");
      })
      .catch((err) => console.log(err));
  };

  //jwt token
  const token = (email) => {
    fetch("http://localhost:5000/jwt", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("accessToken", data.token);
      });
  };

  return (
    <div className="hero w-full my-11 mx-auto">
      <div className="hero-content flex-col">
        <div className="card rounded-none py-8 shadow-2xl shadow-black">
          <h1 className="text-2xl text-center text-black font-semibold">
            Log in
          </h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                ref={emailRef}
                type="text"
                name="email"
                placeholder="email"
                className="input border border-stone-300 rounded-sm w-72 focus:outline-none"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="flex border border-stone-300 w-72 rounded-sm">
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input border-none focus:outline-none"
              />
              <a
                href="#"
                onClick={handleResetPassword}
                className="label link link-hover text-sm opacity-85"
              >
                Forgot?
              </a>
              </div>

            </div>
            <div className="form-control mt-2">
              <input
                className="btn btn-neutral text-balance rounded-sm uppercase w-72"
                type="submit"
                value="Log in"
              />
              {loginError && <p className="text-red-600">{loginError}</p>}
            </div>
          </form>
          <p className="text-center -mt-5">
            New to Here ! Please
            <Link className="text-red-800 font-semibold up ml-2 link link-hover" to="/sign_up">
              sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
