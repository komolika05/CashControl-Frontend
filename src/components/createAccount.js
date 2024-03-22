import React, { useState } from "react";
import axios from "axios";
import "./createAccount.css";
import { Routes, Route, Navigate } from "react-router-dom";

function CreateAccount({ navigationHistory }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/create-account",
        {
          name,
          email,
          password,
          confirmPassword,
        }
      );

      if (response.data.success) {
        return <Navigate to="/dashboard" />;
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setMessage("Error creating account. Please try again later.");
    }
  };

  return (
    <div className="form">
      <h1>Create Account</h1>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />
      </label>
      <button
        onClick={handleCreateAccount}
        id="create-account-btn"
        className="create-account-btn"
      >
        Create Account
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CreateAccount;
