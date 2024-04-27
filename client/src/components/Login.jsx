// Login.jsx

import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container
      className="login-container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Form onSubmit={handleLogin} style={{ width: "320px" }}>
        <h3 className="text-center mb-4">LOGIN</h3>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="text-center mb-4">
          <Form.Text>
            Not Registered?{" "}
            <Link to={"/register"} className="text-decoration-none">
              REGISTER NOW
            </Link>
          </Form.Text>
        </Form.Group>

        <Button variant="warning" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
