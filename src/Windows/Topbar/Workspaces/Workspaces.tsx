import Hyprland from "gi://AstalHyprland"
const hyprland = Hyprland.get_default()
import { Variable, bind } from "astal"

const getActiveWorkspaces = (monitorId: number) => {
  const workspaces = hyprland.get_workspaces()

  const monitor = hyprland.get_monitor(monitorId)

  const monitorWorkspaces = workspaces.filter(
    (workspace) => workspace.monitor.id === monitor.id,
  )
  const activeWorkspace = monitor.get_active_workspace()

  monitorWorkspaces.sort((a, b) => {
    return a.id - b.id
  })

  return { workspaces: monitorWorkspaces, activeWorkspace }
}

export default function Workspaces(monitor: number) {
  const activeWorkspaceId = Variable<Number>(-1)
  const { workspaces, activeWorkspace } = getActiveWorkspaces(monitor)
  if (activeWorkspaceId.get() === -1) activeWorkspaceId.set(activeWorkspace.id)
  const availableWorkspaces = Variable<Hyprland.Workspace[]>(workspaces)
  return (
    <box
      className="workspaces-wrapper"
      setup={(self) => {
        self.hook(hyprland, "event", (self, event, args) => {
          if (event === "workspacev2") {
            const [activeId, activeName] = args.split(",")
            if (
              availableWorkspaces
                .get()
                .find((workspace) => workspace.id === Number(activeId))
            ) {
              activeWorkspaceId.set(Number(activeId))
            }
            console.log(monitor, args, event)
            return
          }
        })
      }}
    >
      {bind(availableWorkspaces).as((workspaces) => {
        return workspaces.map((workspace) => {
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
                className={bind(activeWorkspaceId).as(
                  (val) =>
                    `workspace-label ${val === workspace.id ? "active-workspace-label" : ""}`,
                )}
                label={`${workspace.id}`}
              />
            </button>
          )
        })
      })}
    </box>
  )
}
