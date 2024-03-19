import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login/otp/send",
        {
          phoneNumber,
        }
      );

      if (response.data.success) {
        setOtpSent(true);
        setMessage("OTP sent successfully. Check your phone.");
      } else {
        setMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Error sending OTP. Please try again later.");
    }
  };

  const handleVerifySubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login/otp/verify",
        {
          phoneNumber,
          otp,
        }
      );

      if (response.data.success) {
        setMessage("OTP verification successful. You are now logged in!");
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Error verifying OTP. Please try again later.");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login/otp/send",
        {
          phoneNumber,
        }
      );

      if (response.data.success) {
        setMessage("OTP resent successfully. Check your phone.");
      } else {
        setMessage("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setMessage("Error resending OTP. Please try again later.");
    }
  };

  return (
    <div className="form">
      <h1>Login / Signup</h1>

      {!otpSent ? (
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </label>
      ) : (
        <>
          <label>
            OTP:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </label>
          <button onClick={handleVerifySubmit} id="verify-btn">
            Verify OTP
          </button>
          <button onClick={handleResendOtp} id="resend-btn" className="resend-btn">
            Resend OTP
          </button>
        </>
      )}

      <br />

      {!otpSent && (
        <button onClick={handleLoginSubmit} id="send-otp-btn">
          Send OTP
        </button>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Login;
