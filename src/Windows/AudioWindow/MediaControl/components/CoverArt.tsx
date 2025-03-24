import AstalMpris from "gi://AstalMpris?version=0.1"
import { bind } from "../../../../../../../../../usr/share/astal/gjs"

export default function CoverArt(player: AstalMpris.Player) {
  return (
    <box
      className="cover-art"
      expand={false}
      css={bind(player, "coverArt").as(
        (coverArt) => `background-image: url("${coverArt}");`,
      )}
    ></box>
  )
}
