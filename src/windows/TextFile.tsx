import WindowWrapper from "../hoc/WindowWrapper";
import WindowControlls from "../components/WindowControlls";
import useWindowStore from "../store/window";

interface TextFileData {
  name: string;
  image?: string;
  subtitle?: string;
  description?: string[];
}

const TextFileWindow = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile.data as TextFileData | null;

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControlls target="txtfile" />
        <h2>{data.name || 'Untitled'}</h2>
      </div>

      <div className="p-4 text-file-content">
        {data.image && (
          <div className="mb-4 flex justify-center">
            <img 
              src={data.image} 
              alt={data.name} 
              className="max-w-full h-auto max-h-48 object-contain"
            />
          </div>
        )}
        
        {data.subtitle && (
          <h3 className="text-lg font-medium mb-3">{data.subtitle}</h3>
        )}
        
        <div className="space-y-2">
          {data.description?.map((paragraph, index) => (
            <p key={index} className="text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

const TextFile = WindowWrapper(TextFileWindow, "txtfile");
export default TextFile;
