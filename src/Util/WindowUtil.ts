import { App } from "astal/gtk3"
import { Variable } from "astal"

export const toggledWindow = Variable<undefined | string>(undefined)

export const toggleWindow = (newWindow: string | undefined) => {
  if (newWindow) {
    App.toggle_window(newWindow)
  }
  if (toggledWindow.get()) {
    App.toggle_window(toggledWindow.get()!)
  }
  toggledWindow.set(newWindow)
}
