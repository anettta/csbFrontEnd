// import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageInputForm from "./components/ImageInputForm/ImageInputForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import { Component } from "react";

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

function App() {
  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageInputForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
