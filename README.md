# What is this?

Frostlight is a Collection of AGS Widgets that might be useful for people.

I personally am developing them for my Hyprland setup, so features will be added as I need them

# Preview

![](assets/20241005_174909_image.png)

### Media Control

![](assets/20241005_160527_image.png)

### Theme Customization (WIP!)

![](assets/20241005_160429_image.png)

### Topbar (WIP!)

![](assets/20241005_174937_image.png)

# Requirements

**If you use the default config, you will need:**

- swww
- wallust (v3)
- magick

**These are required for the customization tab. Each command can be changed in the `config.json`** [see Configuration Notes](https://github.com/Skiftstar/Frostlight?tab=readme-ov-file#configuration)

# Installation

Install [AGS](https://aylur.github.io/ags-docs/config/installation/)

Clone the Repo

Put the files in `~/.config/ags`

Run `ags` (preferrably put the command in your autostart)

# Configuration

You can find a `config.json` file, **before making changes, stop ags**, then simply make your changes and start ags again.

This will be streamlined once the config window is complete (see Roadmap)

The wallust config is located in `style/wallust` if you want to edit how themes are generated

# Roadmap

### Done

- Config File
- Media Player
- Audio Stream Control
- Grouping of similiar Audio Streams (currently just when e.g. Games have multiple Streams)
- Collapseable Layout
- Audio Device Picker
- CSS Hot Reload
- Taskbar at the Top
  - Disableable in `config.json`
  - Time/Date
  - System Tray
  - Round Corner between side and topbar
  - Workspaces
- Theme Customization
  - Different Themes
  - CSS Generation with Wallust
  - Commands customizeable in config
  - Wallust/Image Manip configureable in config
  - Display Wallpaper in Tab

### Still want to do

- Show Audio children streams
- Taskbar at the Top
  - Bluetooth Control
  - Network Control
  - Calendar
- Theme Customization
  - CSS Editor
  - Make a better looking LightMode toggle...
- Config (Extra Menu)
  - Adjust important variables
  - Change executed commands
- Application Picker (Extra Sub menu)
- System Ressources (Extra Sub Menu)
- Process Killer (in Sys Ressources)
- Couple QoL Changes
  - Hotkeys to show sidebar windows
  - Config for autogenerated themes
  - "Auto" mode for theme which checks system theme
