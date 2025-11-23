import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Dock from "./components/Dock";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import Terminal from "./windows/Terminal";
import Safari from "./windows/Safari";
import Resume from "./windows/Resume";
import Finder from "./windows/Finder";
import TextFile from "./windows/TextFile";
import ImageFile from "./windows/ImageFile";

gsap.registerPlugin(Draggable);

export default function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <TextFile />
      <ImageFile />
    </main>
  );
}
