import Variable from "resource:///com/github/Aylur/ags/variable.js"

const Dropdown = (options, activeItem, onChange, icon) => {
	const showChild = Variable(false)
	const animationDur = 250

	const iconWidget = icon
		? Widget.Box({
				hpack: "start",
				expand: true,
				children: [
					Widget.Icon({
						hpack: "start",
						className: "dropdown-icon",
						icon: `${icon}-symbolic`,
					}),
					Widget.Separator({ className: "dropdown-icon-separator" }),
				],
		  })
		: null

	const button = Widget.Button({
		className: "dropdown-toggle",
		child: Widget.CenterBox({
			expand: true,
			startWidget: iconWidget,
			centerWidget: Widget.Label({
				expand: true,
				justification: "center",
				className: "dropdown-label",
				max_width_chars: 30,
				truncate: "end",
				label: activeItem.value ?? "",
			}).hook(
				activeItem,
				(self) => {
					self.label = activeItem.value ?? ""
				},
				"changed"
			),
		}),
		onClicked: (self) => {
			if (showChild.value === true) {
				//Revealer currently shown
				setTimeout(() => (self.class_name = "dropdown-toggle"), Math.max(0, animationDur - 150))
			} else {
				self.class_name = self.class_name + " active"
			}
			showChild.value = !showChild.value
		},
	})

	const buildOptionButtons = (optionStack) => {
		for (const child of optionStack.get_children()) {
			optionStack.remove(child)
			child.destroy()
		}

		optionStack.children = options.value.map((option, index) => {
			return Widget.Button({
				class_name: "dropdown-option-button",
				onClicked: () => {
					activeItem.value = option
					showChild.value = false
					setTimeout(() => (button.class_name = "dropdown-toggle"), Math.max(0, animationDur - 150))
					onChange({ option: options[index], index })
				},
				child: Widget.Label({
					max_width_chars: 30,
					class_name: "dropdown-label",
					truncate: "end",
					label: option,
				}),
			})
		})
	}

	const optionStack = Widget.Box({
		class_name: "dropdown-options-stack",
		vertical: true,
	}).hook(options, buildOptionButtons, "changed")

	const revealer = Widget.Revealer({
		revealChild: showChild.value,
		vpack: "start",
		transitionDuration: animationDur,
		transition: "slide_down",
		child: optionStack,
	})

	showChild.connect("changed", ({ value }) => {
		revealer.reveal_child = value
	})

	return Widget.Box({
		vertical: true,
		children: [button, revealer],
	})
}

export default Dropdown
