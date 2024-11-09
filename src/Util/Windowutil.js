export const toggledWindow = Variable(undefined);

export const toggleWindow = (newWindow) => {
	if (toggledWindow) App.closeWindow(toggledWindow.value);
	if (newWindow) {
		App.openWindow(newWindow);
	}
	toggledWindow.value = newWindow;
};
