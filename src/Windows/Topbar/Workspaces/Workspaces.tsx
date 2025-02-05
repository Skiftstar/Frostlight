import Hyprland from "gi://AstalHyprland"
const hyprland = Hyprland.get_default()

const getActiveWorkspaces = (monitorId: number) => {
  const workspaces = hyprland.get_workspaces()

  console.log(workspaces)
  const monitor = hyprland.get_monitor(monitorId)

  const monitorWorkspaces = workspaces.filter(
    (workspace) => workspace.monitor.id === monitor.id,
  )
  const activeWorkspace = monitor.get_active_workspace()

  console.log(workspaces, activeWorkspace)

  monitorWorkspaces.sort((a, b) => {
    return a.id - b.id
  })

  return { workspaces: monitorWorkspaces, activeWorkspace }
}

export default function Workspaces(monitor: number) {
  return (
    <box
      className="workspaces-wrapper"
      setup={(self) => {
        self.hook(hyprland, "event", () => {
          const { workspaces, activeWorkspace } = getActiveWorkspaces(monitor)
          self.children = workspaces.map((workspace) => {
            return (
              <button
                onClick={() => {
                  hyprland.message_async(
                    `dispatch workspace ${workspace.id}`,
                    () => {},
                  )
                }}
                className="workspace-button"
              >
                <label
                  className={`workspace-label ${activeWorkspace.id === workspace.id ? "active-workspace-label" : ""}`}
                  label={`${workspace.id}`}
                />
              </button>
            )
          })
        })
      }}
    >
      {}
    </box>
  )
}
