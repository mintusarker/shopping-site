import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, googleLogin, updateUser } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  const [signUpError, setSignUpError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSignUp = (data) => {
    console.log("data", data);
    setSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User created successfully");
        const userInfo = {
          displayName: data.name,
          // photoURL: data?.PhotoURL,
        };

        console.log(userInfo);

        updateUser(userInfo)
          .then(() => {
            const email = data?.email;
            // const photoURL = data?.photoURL;
            // console.log(email, photoURL);

            //save user to database
            saveUser(data.name, data.email);

            token(email);
            navigate(from, { replace: true });
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.error(error);
        setSignUpError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const email = user.email;
        const name = user.displayName;

        //save user to database
        saveUser(name, email);

        token(email);
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };

  //save user function
  const saveUser = (name, email) => {
    const user = { name, email };
    fetch("user-dashboard-server-five.vercel.app/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  //jwt token
  const token = (email) => {
    fetch("user-dashboard-server-five.vercel.app/jwt", {
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
    <div className="h-auto mt-12 flex justify-center items-center">
      <div className="w-96 p-6 mx-auto shadow-2xl shadow-black">
        <h1 className="text-xl text-center text-black font-semibold">
          Create New Account
        </h1>

        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input border-stone-300 rounded-sm w-full focus:outline-none"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input border-stone-300 rounded-sm w-full focus:outline-none"
              {...register("PhotoURL", {
                required: "Photo URL is required",
              })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div> */}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input border-stone-300 rounded-sm w-full focus:outline-none"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input border-stone-300 rounded-sm w-full focus:outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password at least 6 characters or longer",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <input
            className="btn btn-neutral rounded-sm uppercase text-base my-3 w-full"
            value="Sign up"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p>
          Already have an account ! Please
          <Link
            to="/login"
            className="text-red-800 link link-hover font-bold ml-2"
          >
            Log in
          </Link>
        </p>
        <div className="divider">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full rounded-sm"
        >
          CONTINUE WITH GOOGLE
        </button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default SignUp;
