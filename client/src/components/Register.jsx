// Register.jsx

import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Register({ isAuthenticated, setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        { name, email, phone, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setName("");
      setEmail("");
      setPhone("");
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
      className="register-container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Form onSubmit={handleRegister} style={{ width: "320px" }}>
        <h3 className="text-center mb-4">REGISTER</h3>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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

        <Form.Group controlId="formBasicPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
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
            Already Registered?{" "}
            <Link to={"/login"} className="text-decoration-none">
              LOGIN
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

export default Register;
