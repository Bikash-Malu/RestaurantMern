import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiox from "axios";
import Navbar from "./Navbar";
const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const userhandle = (event) => {
    event.preventDefault();
    // console.log(name,email,password)
    axiox
      .post("http://localhost:1200/sign", {name,email,password})
      .then((res) => {
        console.log('come')
        toast("🦄 Register sucessfully", {
          position: "bottom-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(res);
        setname("");
        setemail("");
        setpassword("");
      })
      .catch((err) => {
        console.log(err)
        toast(`fill all the field`, {
          position: "bottom-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Signup</h4>
              </div>
              <div className="card-body">
                <form onSubmit={userhandle}>
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      id="name"
                      placeholder="Enter your name"
                      name="name"
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label for="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      id="email"
                      placeholder="Enter your email"
                      name="email"
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      name="password"
                      placeholder="Enter your password"
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                    />
                  </div>
                  <button type="submit" className="btn btn-warning mt-2 btn-sm">
                    Sign Up
                  </button>
                  <Link
                    to={"/login"}
                    className="btn btn-primary m-2 btn-sm"
                    style={{ position: "relative", top: "4px" }}
                  >
                    Already user{" "}
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Signup;
