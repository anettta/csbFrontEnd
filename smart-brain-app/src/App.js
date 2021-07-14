// import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageInputForm from "./components/ImageInputForm/ImageInputForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import Signin from "./components/Signin/Signin";
import { Component } from "react";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "9953bc2236614c848389cecd9b67cfd5",
});

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // onButtonSubmit = () => {
  //   this.setState({ imageUrl: this.state.input });
  //   app.models
  //     .predict(
  //       // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
  //       // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
  //       // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
  //       // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
  //       // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
  //       // so you would change from:
  //       // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  //       // to:
  //       // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
  //       "c0c0ac362b03416da06ab3fa36fb58e3",
  //       this.state.input
  //     )
  //     .then((response) => {
  //       console.log("hi", response);
  //       if (response) {
  //         fetch("http://localhost:3000/image", {
  //           method: "put",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             id: this.state.user.id,
  //           }),
  //         })
  //           .then((response) => response.json())
  //           .then((count) => {
  //             this.setState(Object.assign(this.state.user, { entries: count }));
  //           });
  //       }
  //       this.displayFaceBox(this.calculateFaceLocation(response));
  //     })
  //     .catch((err) => console.log(err));
  // };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
  };

  render() {
    const { imageUrl, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} />
        {this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <div>
            {" "}
            <Logo />
            <Rank />
            <ImageInputForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
