import WindowWrapper from "../hoc/WindowWrapper";
import WindowControlls from "../components/WindowControlls";
import useWindowStore from "../store/window";

interface ImageFileData {
  name: string;
  imageUrl: string;
}

const ImageFileWindow = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile.data as ImageFileData | null;

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControlls target="imgfile" />
        <h2>{data.name || "Untitled Image"}</h2>
      </div>

      <div className="p-4 image-file-content flex justify-center items-center h-full">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="w-full h-auto max-h-[70vh] object-contain rounded"
        />
      </div>
    </>
  );
};

const ImageFile = WindowWrapper(ImageFileWindow, "imgfile");
export default ImageFile;
