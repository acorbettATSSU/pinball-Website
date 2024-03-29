import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PRIMARY_COLOR = "#000000";
const SECONDARY_COLOR = "#EDEADE";
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/signup`;

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    displayName: "",
    ifpa: "" // IFPA field is now optional and can be an empty string
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [light, setLight] = useState(false);
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
  const [bgText, setBgText] = useState("Light Mode");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {
    if (light) {
      setBgColor("white");
      setBgText("Dark mode");
    } else {
      setBgColor(SECONDARY_COLOR);
      setBgText("Light mode");
    }
  }, [light]);

  let labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
  };
  let backgroundStyling = { background: bgColor };
  let buttonStyling = {
    background: "black",
    borderStyle: "none",
    color: "white",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, data);
      // const {accessToken} = response.data;
      // Store token in localStorage
      window.location.href = `/login?${Math.random()}`;
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom vh-100">
          <div
            className="row d-flex justify-content-center align-items-center h-100 "
            style={backgroundStyling}
          >
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicDisplayName">
                  <Form.Label style={labelStyling}>Display Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="displayName"
                    onChange={handleChange}
                    placeholder="Enter Display Name"
                  />
                  <Form.Text className="text-muted">
                    This will be your public display name.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label style={labelStyling}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="Enter username"
                  />
                  <Form.Text className="text-muted">
                    Use this to login.  6 characters minimum.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={labelStyling}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter Email Please"
                  />
                  <Form.Text className="text-muted">
                   
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicIfpa">
                  <Form.Label style={labelStyling}>IFPA</Form.Label>
                  <Form.Control
                    type="number"
                    name="ifpa"
                    onChange={handleChange}
                    placeholder="Enter IFPA (optional)"
                  />
                  <Form.Text className="text-muted">
                    
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={labelStyling}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </Form.Group>
                
                {error && (
                  <div style={labelStyling} className="pt-3">
                    {error}
                  </div>
                )}
                <Button
                  variant="primary"
                  type="submit"
                  style={buttonStyling}
                  className="mt-2"
                >
                  Register
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
