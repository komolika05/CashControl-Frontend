import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OtpInput.css";

function OtpInput({ phoneNumber, onVerify }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [newOtp, setNewOtp] = useState(Array(6).fill(null));
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const inputs = document.querySelectorAll(".otp-field > input");

    const handleInputChange = (e, index) => {
      const currentInput = e.target;
      const nextInput = currentInput.nextElementSibling;
      const prevInput = currentInput.previousElementSibling;

      if (currentInput.value.length > 1) {
        currentInput.value = "";
        return;
      }

      if (
        nextInput &&
        nextInput.hasAttribute("disabled") &&
        currentInput.value !== ""
      ) {
        nextInput.removeAttribute("disabled");
        nextInput.focus();
      }

      if (e.key === "Backspace") {
        inputs.forEach((input, idx) => {
          if (index <= idx && prevInput) {
            input.setAttribute("disabled", true);
            input.value = "";
            prevInput.focus();
          }
        });
      }
    };

    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e) => handleInputChange(e, index1));
    });

    return () => {
      inputs.forEach((input, index) => {
        input.removeEventListener("keyup", (e) => handleInputChange(e, index));
      });
    };
  }, []);

  const handleVerifySubmit = async () => {
    onVerify();
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login/otp/verify",
        {
          phoneNumber,
          otp: otp.join(""),
        }
      );
      if (response.data.success) {
        if (response.data.isNewUser) {
          console.log({ isNewUser: true });
          return navigate("/create-account");
        } else {
          return navigate("/dashboard");
        }
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Error verifying OTP. Please try again later.");
    }
  };

  return (
    <div>
      <div className="otp-field mb-4">
        {otp.map((value, index) => (
          <input
            className="otpBox"
            key={index}
            type="number"
            disabled={index !== 0}
            value={value}
            onChange={(e) => {
              const updatedOtp = [...otp];
              updatedOtp[index] = e.target.value;
              setOtp(updatedOtp);

              const updatedNewOtp = updatedOtp.map((value) => parseInt(value));
              setNewOtp(updatedNewOtp);
            }}
          />
        ))}
      </div>
      <br />
      <button
        className="btn btn-primary mb-3"
        onClick={handleVerifySubmit}
        disabled={otp.length !== 6}
      >
        Verify
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default OtpInput;
