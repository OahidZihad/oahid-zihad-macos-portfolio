import { Mail, Search } from "lucide-react";
import WindowControlls from "../components/WindowControlls";
import WindowWrapper from "../hoc/WindowWrapper";
import useWindowStore from "../store/window";
import { gallery, photosLinks } from "../constants";

const PhotosWindow = () => {
  const { openWindow } = useWindowStore();

  return (
    <>
      <div id="window-header">
        <WindowControlls target="photos" />
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="flex w-full">
        <div className="sidebar">
          <h2>Photos</h2>

          <ul>
            {photosLinks.map((link) => (
              <li key={link.id}>
                <img src={link.icon} alt={link.title} />
                <p>{link.title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <ul>
            {gallery.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  openWindow("imgfile", {
                    id: item.id,
                    name: "Gallery image",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: item.img,
                  });
                }}
              >
                <img src={item.img} alt={`Gallery image ${item.id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const Photos = WindowWrapper(PhotosWindow, "photos");
export default Photos;
