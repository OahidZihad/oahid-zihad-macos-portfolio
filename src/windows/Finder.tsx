import WindowWrapper from "../hoc/WindowWrapper";
import { locations } from "../constants";
import useLocationStore from "../store/location";
import clsx from "clsx";
import { Search } from "lucide-react";
import WindowControlls from "../components/WindowControlls";
import useWindowStore from "../store/window";

const FinderWindow = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  type LocationItem = {
    id: number;
    name: string;
    icon: string;
    kind: string;
    type?: string;
    children?: LocationItem[];
    position?: string;
    windowPosition?: string;
    fileType?: string;
    href?: string;
    imageUrl?: string;
    description?: string[];
  };

  const openItem = (item: LocationItem) => {
    if (!item.fileType) return;

    if (item.fileType === "pdf") {
      openWindow("resume");
    } else if (item.fileType === "folder") {
      // Handle folder opening logic here if needed
      console.log("Opening folder:", item.name);
    } else if (["fig", "url"].includes(item.fileType) && item.href) {
      window.open(item.href, "_blank");
    } else if (item.fileType === "img") {
      openWindow("imgfile", item);
    } else if (item.fileType === "txt") {
      openWindow("txtfile", item);
    }
  };

  const renderList = (name: string, items: LocationItem[]) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              activeLocation && item.id === activeLocation.id
                ? "active"
                : "not-active"
            )}
          >
            <img src={item.icon} alt={item.name} className="w-4" />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowControlls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <ul>{renderList("Favourites", Object.values(locations))}</ul>
          <ul>{renderList("My Projects", locations.work.children)}</ul>
        </div>
        <ul className="content">
          {(activeLocation?.children as LocationItem[])?.map((item) => (
            <li
              key={item.id}
              className={item.position || ""}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const Finder = WindowWrapper(FinderWindow, "finder");
export default Finder;
