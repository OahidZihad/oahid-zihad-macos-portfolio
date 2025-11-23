import clsx from "clsx";
import { locations } from "../constants";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "../store/window";
import useLocationStore from "../store/location";

type BaseLocation = {
  id: number;
  name: string;
  icon: string;
  kind: string;
  type?: string;
  children?: unknown[];
  position?: string;
  windowPosition?: string;
};

const projects = locations.work?.children ?? [];

export default function Home() {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const handleOpenProjectFinder = (project: BaseLocation) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    Draggable.create(".folder");
  }, []);

  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProjectFinder(project)}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
