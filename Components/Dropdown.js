import Variable from "resource:///com/github/Aylur/ags/variable.js"

const Dropdown = (options, activeItem, onChange, icon) => {
  const showChild = Variable(false)

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
        label: activeItem,
      }),
    }),
    onClicked: (self) => {
      if (showChild.value === true) {
        //Revealer currently shown
        self.class_name = "dropdown-toggle"
      } else {
        self.class_name = self.class_name + " active"
      }
      showChild.value = !showChild.value
    },
  })

  const optionStack = Widget.Box({
    class_name: "dropdown-options-stack",
    vertical: true,
    children: options.map((option, index) => {
      return Widget.Button({
        class_name: "dropdown-option-button",
        onClicked: () => {
          button.child.center_widget.label = option
          showChild.value = false
          button.class_name = "dropdown-toggle"
          onChange({ option, index })
        },
        child: Widget.Label({
          max_width_chars: 30,
          class_name: "dropdown-label",
          truncate: "end",
          label: option,
        }),
      })
    }),
  })

  const revealer = Widget.Revealer({
    revealChild: showChild.value,
    vpack: "start",
    transitionDuration: 250,
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
