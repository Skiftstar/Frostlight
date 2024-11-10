import { toggledWindow, toggleWindow } from "../../../Util/Windowutil";
import { bind } from "astal";

export default function SidebarButton({
  iconName,
  windowName,
}: {
  iconName: string;
  windowName: string;
}) {
  return (
    <button
      expand={false}
      className={"sidebar-button"}
      onClick={() => {
        if (toggledWindow.get() === windowName) {
          toggleWindow(undefined);
        } else {
          toggleWindow(windowName);
        }
      }}
    >
      <icon
        className={bind(toggledWindow).as((val) => {
          return `sidebar-button-icon ${val === windowName ? "active" : ""}`;
        })}
        icon={`${iconName}-symbolic`}
      />
    </button>
  );
}
