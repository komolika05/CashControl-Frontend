import "./App.css";
import Login from "./components/login";
import waveImage from "./assets/wave.svg";
import illustration from "./assets/illustration.jpg";
import cashControlIcon from "./assets/Cash.png";

function LoginLayout() {
  return (
    <div className="App">
      <img src={cashControlIcon} className="cash-control-icon" alt="" />

      <div className="form-container">
        <Login />
        <img
          src={illustration}
          className="illustration"
          alt="Person with money"
          width={600}
        />
      </div>

      <img src={waveImage} className="wave-image" alt="" id="wave" />
    </div>
  );
}

export default LoginLayout;
