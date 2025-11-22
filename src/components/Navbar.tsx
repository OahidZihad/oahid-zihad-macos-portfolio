import dayjs from "dayjs";
import { navIcons, navLinks, WINDOW_CONFIG } from "../constants";
import useWindowStore from "../store/window";

export default function Navbar() {
  const { openWindow } = useWindowStore();

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">Oahid's Macfolio</p>

        <ul>
          {navLinks.map((item: { id: number; name: string; type: string }) => (
            <li
              key={item.id}
              onClick={() =>
                openWindow(item.type as keyof typeof WINDOW_CONFIG)
              }
            >
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map((icon) => (
            <li key={icon.id}>
              <img src={icon.img} alt={`Icon ${icon.id}`} />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
}
