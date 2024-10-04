const hyprland = await Service.import("hyprland");

const getCurrentMonitorWorkspaces = () => {
  return [1, 2];
  return Array.from({ length: workspaces.value }, (_, i) => i + 1);
};

export const Workspaces = () => {
  return Widget.Box({
    className: "workspaces-wrapper",
    children: getCurrentMonitorWorkspaces().map((workspaceNumber) => {
      Widget.Label({
        label: `${workspaceNumber}`,
      });
    }),
  });
};
