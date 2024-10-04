const systemtray = await Service.import("systemtray");

const SysTrayItem = (item) => {
  return Widget.Button({
    className: "systray-item-button",
    child: Widget.Icon().bind("icon", item, "icon"),
    tooltipMarkup: item.bind("tooltip_markup"),
    onPrimaryClick: (_, event) => item.activate(event),
    onSecondaryClick: (_, event) => item.openMenu(event),
  });
};

export const SysTray = () => {
  return Widget.Box({
    hpack: "end",
    className: "systray-wrapper",
    children: systemtray
      .bind("items")
      .as((i) => i.filter((i) => i.id).map(SysTrayItem)),
  });
};
