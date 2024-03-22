import React, { useState } from "react";
import axios from "axios";
import "./login.scss";
import OtpInput from "./OtpInput";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

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

  return (
    <div className="form">
      <h1>Login / Signup</h1>

      {!otpSent ? (
        <div className="form__group field">
          <input
            type="tel"
            className="form__field"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            name="phoneNumber"
            id="phoneNumber"
            required
          />
          <label htmlFor="phoneNumber" className="form__label">
            Enter your Phone Number
          </label>
        </div>
      ) : (
        <OtpInput
          phoneNumber={phoneNumber}
          onVerify={() => {
            setMessage("");
          }}
        />
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
