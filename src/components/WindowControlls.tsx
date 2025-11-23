import type { WINDOW_CONFIG } from "../constants";
import useWindowStore from "../store/window";

export default function WindowControlls({
  target,
}: {
  target: keyof typeof WINDOW_CONFIG;
}) {
  const { closeWindow, toggleMaximize } = useWindowStore();

  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
      <div className="minimize" onClick={() => closeWindow(target)} />
      <div className="maximize" onClick={() => toggleMaximize(target)} />
    </div>
  );
}
