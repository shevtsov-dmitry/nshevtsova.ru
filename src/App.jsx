import Lottie from "lottie-react";

// <img src="images/bgnoeffects.png" />
// <img src="mygif.gif" />
function App() {
  return (
    <div>
      <video autoPlay muted playsInline loop>
        <source src="dog.mp4" />
      </video>
      <img src="images/terminal.png" />
      <img src="images/dog-on-pc.png" />
    </div>
  );
}

export default App;

// <video
//   width="1920"
//   height="1080"
//   className="fixed z-10 top-[-100px] opacity-50"
//   autoplay
//   preload="auto"
//   controls
// >
//   <source src="vid.mp4" type="video/mp4" />
// </video>

// <Lottie
//   className={"fixed z-10 top-0 opacity-[12%]"}
//   path={"signal.json"}
//   loop={true}
//   autoplay={true}
// />
