import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Dock from "./components/Dock";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import Terminal from "./windows/Terminal";

gsap.registerPlugin(Draggable);

export default function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
    </main>
  );
}
