const hyprland = await Service.import("hyprland");

const getActiveWorkspaces = (monitor) => {
	const workspaces = hyprland.bind("workspaces");

	const monitorWorkspaces = [];
	const activeWorkspace = workspaces.emitter.monitors.find(
		(m) => m.id === monitor,
	).activeWorkspace;
	for (const workspace of workspaces.emitter.workspaces) {
		if (workspace.monitorID === monitor) monitorWorkspaces.push(workspace);
	}

	if (
		activeWorkspace &&
		!monitorWorkspaces.find((workspace) => workspace.id === activeWorkspace.id)
	) {
		monitorWorkspaces.push(activeWorkspace);
	}

	monitorWorkspaces.sort((a, b) => {
		return a.id - b.id;
	});

	return {workspaces: monitorWorkspaces, activeWorkspace};
};

export const Workspaces = (monitor) => {
	return Widget.Box({
		className: "workspaces-wrapper",
	}).hook(hyprland, (box) => {
		const monitorWorkspaceData = getActiveWorkspaces(monitor);
		box.children = monitorWorkspaceData.workspaces.map((workspace) => {
			return Widget.Button({
				className: "workspace-button",
				onPrimaryClick: () => {
					hyprland.messageAsync(`dispatch workspace ${workspace.id}`);
				},
				child: Widget.Label({
					label: `${workspace.id}`,
					className: `workspace-label ${monitorWorkspaceData.activeWorkspace.id === workspace.id ? "active-workspace-label" : ""}`,
				}),
			});
		});
	});
};
